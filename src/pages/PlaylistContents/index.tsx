import { useCallback, useEffect, useState } from 'react'
import { getYoutubePlaylists, getYoutubePlaylistsItems } from '../../utils/api'
import { useParams } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography, Box, Tooltip, CircularProgress } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { IPlaylistsListItems } from '../../utils/context/interface'

import Content from '../../components/Playlist/Content/index'
import ContentSkeleton from '../../components/Playlist/Content/Skeleton/index'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import './styles.css'
import { useAppSelector } from '../../app/hooks'
import { selectUserAccessToken } from '../../utils/arms/user/selectors'
import { useFetchPlaylistContents } from './hook'
import {
    selectPlaylistContentsItems,
    selectPlaylistContentsNextPageToken,
} from '../../utils/arms/playlistContents/selectors'

function PlaylistContent() {
    const { playlistId } = useParams<{ playlistId: string }>()
    const userAccessToken = useAppSelector(selectUserAccessToken)
    const nextPageTokenInStore = useAppSelector(selectPlaylistContentsNextPageToken)
    const playlistContentsItems = useAppSelector(selectPlaylistContentsItems)
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)

    const { arePlaylistContentsLoading, arePlaylistContentsLoaded } = useFetchPlaylistContents(
        userAccessToken,
        playlistId,
        nextPageToken
    )

    let history = useHistory()

    const handleHomeClick = () => {
        history.push('/')
    }

    const loadMorePlaylisContents = () => {
        setNextPageToken(nextPageTokenInStore)
    }

    const displayPlaylistContent = () => {
        let content, skeleton

        if (playlistContentsItems.length > 0) {
            content = (
                <Content
                    playlistId={playlistId}
                    playlistsListItems={{ items: playlistContentsItems }}
                    setPlaylistsListItems={() => {}}
                />
            )
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
                            {/* {playlistData && playlistData.snippet.localized.title} */}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Tooltip title="Editer">
                            <IconButton
                                className="button-filter"
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => {
                                    // if (playlistData !== undefined) {
                                    // dispatch(
                                    //     displayEditPlaylistDialog({
                                    //         editPlaylistDialogData: playlistData,
                                    //         editPlaylistDialogOnClose: setPlaylistData,
                                    //         editPlaylistDialogId: playlistId,
                                    //     })
                                    // )
                                    // }
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
        </div>
    )
}

export default PlaylistContent
