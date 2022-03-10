import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'

import './styles.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined'
import { UserDataContext } from './../../../utils/context/index'
import { DialogActionTypes } from '../../../utils/reducer'
import { getYoutubePlaylists } from './../../../utils/api/index'
import { IPlaylistsData } from '../../../utils/context/interface'
import ListMode from './../../Playlist/ListMode/index'

function SelectPlaylistDialog() {
    const { dispatch, state } = useContext(UserDataContext)
    const [playlistsListData, setPlaylistsListData] = useState<IPlaylistsData>({ items: [] })
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [nextPageToken, setNextPageToken] = useState('')

    const [canSave, setCanSave] = useState(false)

    const executeClose = () => {
        state.selectPlaylistDialogOnClose()

        setPlaylistsListData({ items: [] })
        setIsLoading(false)
        setIsLoaded(false)
        setNextPageToken('')
        setCanSave(false)

        dispatch({
            type: DialogActionTypes.HIDE_SELECT_PLAYLIST_DIALOG,
        })
    }

    const onClose = () => {
        executeClose()
    }

    const onSave = () => {
        executeClose()

        //TODO:
    }

    // TODO: Replace this function when i will use a real translation module
    const handleTranslationByMode = (content: string) => {
        let translation = ''

        if (state.selectPlaylistDialogMode === 'saveIn') {
            switch (content) {
                case 'dialogTitle':
                    translation = 'Enregistrer dans :'
                    break
                case 'dialogExecuteButton':
                    translation = 'Enregistrer'
                    break
            }
        } else if (state.selectPlaylistDialogMode === 'moveTo') {
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
        if (state.selectPlaylistDialogMode === 'saveIn') {
            return <SaveOutlinedIcon />
        } else if (state.selectPlaylistDialogMode === 'moveTo') {
            return <SendAndArchiveOutlinedIcon />
        }
    }

    const loadPlaylistsList = useCallback(() => {
        if (isLoaded === false && isLoading === false && state.isSelectPlaylistDialogOpen === true) {
            setIsLoading(true)

            getYoutubePlaylists(state.accessToken, nextPageToken).then((data) => {
                setIsLoading(false)
                setIsLoaded(true)

                let newItems = [...playlistsListData.items, ...data.items]

                if (state.selectPlaylistDialogHideCurrentPlaylist === true) {
                    newItems = newItems.filter((item) => {
                        return item.id !== state.currentPlaylistId
                    })
                }

                data.items = newItems

                setPlaylistsListData(data)
                setNextPageToken(data.nextPageToken)
            })
        }
    }, [
        state.accessToken,
        state.currentPlaylistId,
        state.isSelectPlaylistDialogOpen,
        state.selectPlaylistDialogHideCurrentPlaylist,
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
        <Dialog className="dialog-select-playlist" open={state.isSelectPlaylistDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle>{handleTranslationByMode('dialogTitle')}</DialogTitle>
            <DialogContent>
                {playlistsListData && (
                    <ListMode
                        playlistsListData={playlistsListData}
                        setCanExecuteAfterSelect={setCanSave}
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
