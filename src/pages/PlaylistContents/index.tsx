import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography, Box, Tooltip } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Content from '../../components/Playlist/Content/index'
import ContentSkeleton from '../../components/Playlist/Content/Skeleton/index'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import './styles.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUserAccessToken } from '../../utils/arms/user/selectors'
import { useFetchPlaylistContents } from './hook'
import {
    selectPlaylistContentsItems,
    selectPlaylistContentsNextPageToken,
} from '../../utils/arms/playlistContents/selectors'
import { removePlaylistContents } from '../../utils/arms/playlistContents/reducer'
import { selectPlaylistItem } from '../../utils/arms/playlists/selectors'
import EditPlaylistDialog from '../../components/Dialog/EditPlaylistDialog'

function PlaylistContent() {
    const dispatch = useAppDispatch()

    let history = useHistory()
    const { playlistId } = useParams<{ playlistId: string }>()

    const playlistItem = useAppSelector((state) => selectPlaylistItem(state, playlistId))
    const userAccessToken = useAppSelector(selectUserAccessToken)
    const nextPageTokenInStore = useAppSelector(selectPlaylistContentsNextPageToken)
    const playlistContentsItems = useAppSelector(selectPlaylistContentsItems)

    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
    const [isEditPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false)

    const { arePlaylistContentsLoading, arePlaylistContentsLoaded } = useFetchPlaylistContents(
        userAccessToken,
        playlistId,
        nextPageToken
    )

    const handleHomeClick = () => {
        dispatch(removePlaylistContents({}))
        history.push('/playlists')
    }

    const loadMorePlaylisContents = () => {
        setNextPageToken(nextPageTokenInStore)
    }

    const displayPlaylistContent = () => {
        let content, skeleton

        if (playlistContentsItems.length > 0) {
            content = <Content playlistId={playlistId} playlistsListItems={{ items: playlistContentsItems }} />
        }

        if (arePlaylistContentsLoaded && playlistContentsItems.length === 0) {
            content = <div>Aucune vidéo dans votre playlist</div>
        }

        if (arePlaylistContentsLoading) {
            skeleton = <ContentSkeleton isFirstLoad={playlistContentsItems.length === 0} />
        }

        return (
            <div>
                {content}
                {skeleton}
            </div>
        )
    }

    return (
        <div className="playlist-content">
            <AppBar position="static">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <Tooltip title="Retour">
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handleHomeClick()}
                            >
                                <ChevronLeftOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1" color="text.primary">
                            {playlistItem.snippet.localized.title}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Tooltip title="Editer">
                            <IconButton
                                className="button-filter"
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    setIsPlaylistDialogOpen(true)
                                }}
                                color="inherit"
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Box>
            </AppBar>

            {displayPlaylistContent()}

            {playlistContentsItems.length > 0 && nextPageTokenInStore !== undefined && (
                <div className="see-more-container">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            loadMorePlaylisContents()
                        }}
                    >
                        Voir plus ...
                    </Button>
                </div>
            )}

            <EditPlaylistDialog
                visible={isEditPlaylistDialogOpen}
                playlistId={playlistId}
                onCancel={() => setIsPlaylistDialogOpen(false)}
            />
        </div>
    )
}

export default PlaylistContent
