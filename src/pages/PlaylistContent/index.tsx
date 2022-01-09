import { useCallback, useContext, useEffect, useState } from 'react'
import { getYoutubePlaylistsItems } from '../../utils/api'
import { UserDataContext } from '../../utils/context/userData/index'
import { useParams } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Content, { IPlaylistsListItems } from '../../components/Playlist/Content/index'
import ContentSkeleton from '../../components/Playlist/Content/Skeleton/index'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import './styles.css'

function PlaylistContent() {
    const { state } = useContext(UserDataContext)
    const { playlistId } = useParams<{ playlistId: string }>()
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

    useEffect(() => {
        loadPlaylistsItems()
    }, [loadPlaylistsItems])

    return (
        <div className="playlist-content">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => handleHomeClick()}
                    >
                        <ChevronLeftOutlinedIcon />
                    </IconButton>
                    <IconButton
                        className="button-filter"
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => console.log('test')}
                        color="inherit"
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {isLoaded && !playlistsListItems && <div>Aucun vidéo dans votre playlist</div>}

            {playlistsListItems && <Content playlistsListItems={playlistsListItems} />}

            {isLoading && <ContentSkeleton isFirstLoad={isFirstLoad()} />}

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
