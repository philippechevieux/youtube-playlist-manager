import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'

import './styles.css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserAccessToken } from '../../../utils/arms/user/selectors'
import { useCallback, useEffect, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined'
import { getYoutubePlaylists } from './../../../utils/api/index'
import { IPlaylistsData } from '../../../utils/context/interface'
import ListMode from './../../Playlist/ListMode/index'
import { hideEditPlaylistDialog } from '../../../utils/arms/global/reducer'
import {
    selectIsSelectPlaylistDialogOpen,
    selectSelectPlaylistDialogCurrentPlaylistId,
    selectSelectPlaylistDialogHideCurrentPlaylist,
    selectSelectPlaylistDialogMode,
    selectSelectPlaylistDialogOnClose,
    selectSelectPlaylistDialogOnSave,
} from '../../../utils/arms/global/selectors'

function SelectPlaylistDialog() {
    const dispatch = useAppDispatch()

    const userAccessToken = useAppSelector(selectUserAccessToken)
    const isSelectPlaylistDialogOpen = useAppSelector(selectIsSelectPlaylistDialogOpen)
    const selectPlaylistDialogOnClose = useAppSelector(selectSelectPlaylistDialogOnClose)
    const selectPlaylistDialogOnSave = useAppSelector(selectSelectPlaylistDialogOnSave)
    const selectPlaylistDialogMode = useAppSelector(selectSelectPlaylistDialogMode)
    const selectPlaylistDialogCurrentPlaylistId = useAppSelector(selectSelectPlaylistDialogCurrentPlaylistId)
    const selectPlaylistDialogHideCurrentPlaylist = useAppSelector(selectSelectPlaylistDialogHideCurrentPlaylist)

    const [playlistsListData, setPlaylistsListData] = useState<IPlaylistsData>({ items: [] })
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [nextPageToken, setNextPageToken] = useState('')
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('')
    const [canSave, setCanSave] = useState(false)

    const executeClose = () => {
        selectPlaylistDialogOnClose()

        setPlaylistsListData({ items: [] })
        setIsLoading(false)
        setIsLoaded(false)
        setNextPageToken('')
        setCanSave(false)

        dispatch(hideEditPlaylistDialog())
    }

    const onClose = () => {
        executeClose()
    }

    const onSave = () => {
        selectPlaylistDialogOnSave(selectedPlaylistId)

        executeClose()
    }

    // TODO: Replace this function when i will use a real translation module
    const handleTranslationByMode = (content: string) => {
        let translation = ''

        if (selectPlaylistDialogMode === 'saveIn') {
            switch (content) {
                case 'dialogTitle':
                    translation = 'Enregistrer dans :'
                    break
                case 'dialogExecuteButton':
                    translation = 'Enregistrer'
                    break
            }
        } else if (selectPlaylistDialogMode === 'moveTo') {
            switch (content) {
                case 'dialogTitle':
                    translation = 'Déplacer vers :'
                    break
                case 'dialogExecuteButton':
                    translation = 'Déplacer'
                    break
            }
        }

        return translation
    }

    const displayExecuteButtonIcon = () => {
        if (selectPlaylistDialogMode === 'saveIn') {
            return <SaveOutlinedIcon />
        } else if (selectPlaylistDialogMode === 'moveTo') {
            return <SendAndArchiveOutlinedIcon />
        }
    }

    const loadPlaylistsList = useCallback(() => {
        if (isLoaded === false && isLoading === false && isSelectPlaylistDialogOpen === true) {
            setIsLoading(true)

            getYoutubePlaylists(userAccessToken, nextPageToken).then((data) => {
                setIsLoading(false)
                setIsLoaded(true)

                let newItems = [...playlistsListData.items, ...data.items]

                if (selectPlaylistDialogHideCurrentPlaylist === true) {
                    newItems = newItems.filter((item) => {
                        return item.id !== selectPlaylistDialogCurrentPlaylistId
                    })
                }

                data.items = newItems

                setPlaylistsListData(data)
                setNextPageToken(data.nextPageToken)
            })
        }
    }, [
        userAccessToken,
        selectPlaylistDialogCurrentPlaylistId,
        isSelectPlaylistDialogOpen,
        selectPlaylistDialogHideCurrentPlaylist,
        nextPageToken,
        isLoading,
        isLoaded,
        playlistsListData,
    ])

    const loadMorePlaylistList = () => {
        setIsLoaded(false)
        loadPlaylistsList()
    }

    useEffect(() => {
        loadPlaylistsList()
    }, [loadPlaylistsList])

    return (
        <Dialog className="dialog-select-playlist" open={isSelectPlaylistDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle>{handleTranslationByMode('dialogTitle')}</DialogTitle>
            <DialogContent>
                {playlistsListData && (
                    <ListMode
                        playlistsListData={playlistsListData}
                        setCanExecuteAfterSelect={setCanSave}
                        setSelectedPlaylistId={setSelectedPlaylistId}
                        mode="selectPlaylist"
                    />
                )}
                {!isLoading && nextPageToken !== undefined && (
                    <div className="see-more-container">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                loadMorePlaylistList()
                            }}
                        >
                            Voir plus ...
                        </Button>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
                <Button
                    disabled={!canSave}
                    variant="contained"
                    color="secondary"
                    startIcon={displayExecuteButtonIcon()}
                    onClick={onSave}
                >
                    {handleTranslationByMode('dialogExecuteButton')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SelectPlaylistDialog
