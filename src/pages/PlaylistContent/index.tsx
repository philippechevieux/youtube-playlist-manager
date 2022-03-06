import { useCallback, useContext, useEffect, useState } from 'react'
import { getYoutubePlaylists, getYoutubePlaylistsItems } from '../../utils/api'
import { UserDataContext } from '../../utils/context/index'
import { useParams } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { IPlaylistsItemData } from '../../utils/context/interface'

import Content, { IPlaylistsListItems } from '../../components/Playlist/Content/index'
import ContentSkeleton from '../../components/Playlist/Content/Skeleton/index'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import './styles.css'
import { DialogActionTypes } from '../../utils/reducer'

function PlaylistContent() {
    const { dispatch, state } = useContext(UserDataContext)
    const { playlistId } = useParams<{ playlistId: string }>()
    const [playlistData, setPlaylistData] = useState<IPlaylistsItemData>()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [playlistsListItems, setPlaylistsListItems] = useState<IPlaylistsListItems>({ items: [] })
    const [nextPageToken, setNextPageToken] = useState('')

    let history = useHistory()

    const handleHomeClick = () => {
        history.push('/')
    }

    const isFirstLoad = () => {
        return playlistsListItems.items.length === 0 && !isLoaded
    }

    const loadPlaylistsItems = useCallback(() => {
        if (isLoaded === false && isLoading === false) {
            setIsLoading(true)

            getYoutubePlaylistsItems(state.accessToken, playlistId, nextPageToken).then((data) => {
                setIsLoading(false)
                setIsLoaded(true)

                const newItems = [...playlistsListItems.items, ...data.items]
                data.items = newItems

                setPlaylistsListItems(data)
                setNextPageToken(data.nextPageToken)
            })
        }
    }, [state.accessToken, playlistId, nextPageToken, isLoading, isLoaded, playlistsListItems])

    const loadMorePlaylistItems = () => {
        setIsLoaded(false)
        loadPlaylistsItems()
    }

    const displayPlaylistContent = () => {
        let content, skeleton

        if (playlistsListItems.items.length > 0) {
            content = <Content playlistsListItems={playlistsListItems} setPlaylistsListItems={setPlaylistsListItems} />
        }

        if (isLoaded && playlistsListItems.items.length === 0) {
            content = <div>Aucune vidéo dans votre playlist</div>
        }

        if (isLoading) {
            skeleton = <ContentSkeleton isFirstLoad={isFirstLoad()} />
        }

        return (
            <div>
                {content}
                {skeleton}
            </div>
        )
    }

    useEffect(() => {
        loadPlaylistsItems()
    }, [loadPlaylistsItems])

    useEffect(() => {
        function getPlaylistData() {
            if (playlistData === undefined) {
                getYoutubePlaylists(state.accessToken, undefined, [playlistId]).then((data) => {
                    setPlaylistData(data.items[0])
                })
            }
        }

        getPlaylistData()
    }, [dispatch, state.accessToken, playlistId, playlistData])

    return (
        <div className="playlist-content">
            <AppBar position="static">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => handleHomeClick()}
                        >
                            <ChevronLeftOutlinedIcon />
                        </IconButton>
                        <Typography variant="body1" color="text.primary">
                            {playlistData && playlistData.snippet.localized.title}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                            className="button-filter"
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => {
                                if (playlistData !== undefined) {
                                    dispatch({
                                        type: DialogActionTypes.DISPLAY_EDIT_PLAYLIST_DIALOG,
                                        editPlaylistDialogData: playlistData,
                                        editPlaylistDialogOnClose: setPlaylistData,
                                        editPlaylistDialogId: playlistId,
                                    })
                                }
                            }}
                            color="inherit"
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </Box>
            </AppBar>

            {displayPlaylistContent()}

            {nextPageToken !== undefined && (
                <div className="see-more-container">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            loadMorePlaylistItems()
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
