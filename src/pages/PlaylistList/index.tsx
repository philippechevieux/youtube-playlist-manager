import { useEffect, useContext, useState, useCallback } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { UserDataContext } from '../../utils/context/userData/index'

import { AppBar, Toolbar, IconButton, Button, Box, Typography } from '@mui/material'

import './styles.css'

import MosaicMode from '../../components/Playlist/MosaicMode'
import MosaicModeSkeleton from '../../components/Playlist/MosaicMode/Skeleton'
import ListMode from '../../components/Playlist/ListMode'

import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import { useHistory } from 'react-router-dom'
import { IPlaylistsData } from './../../components/Playlist/interfaces'

function PlaylistList() {
    let history = useHistory()

    const { state } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [nextPageToken, setNextPageToken] = useState('')
    const [playlistsListData, setPlaylistsListData] = useState<IPlaylistsData>({ items: [] })
    const [playlistActiveDisplayMode, setPlaylistActiveDisplayMode] = useState('mosaic')

    const handlePlaylistDisplayMode = (mode: string) => {
        if (mode !== playlistActiveDisplayMode) {
            setPlaylistActiveDisplayMode(mode)
        }
    }

    const handlePlaylistClickOnList = (id: string) => {
        history.push('/playlist/' + id)
    }

    const loadPlaylistsList = useCallback(() => {
        if (isLoaded === false && isLoading === false) {
            setIsLoading(true)

            getYoutubePlaylists(state.accessToken, nextPageToken).then((data) => {
                setIsLoading(false)
                setIsLoaded(true)

                const newItems = [...playlistsListData.items, ...data.items]
                data.items = newItems

                setPlaylistsListData(data)
                setNextPageToken(data.nextPageToken)
            })
        }
    }, [state.accessToken, nextPageToken, isLoading, isLoaded, playlistsListData])

    const loadMorePlaylistList = () => {
        setIsLoaded(false)
        loadPlaylistsList()
    }

    useEffect(() => {
        loadPlaylistsList()
    }, [loadPlaylistsList])

    return (
        <div className="playlist-list">
            <AppBar position="static">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <IconButton
                            className="button-filter"
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => console.log('test')}
                            color="inherit"
                        >
                            <SortOutlinedIcon />
                        </IconButton>
                        <Typography variant="body1" color="text.primary">
                            Trier
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="body1" color="text.primary">
                            Affichage
                        </Typography>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => handlePlaylistDisplayMode('mosaic')}
                            color={playlistActiveDisplayMode === 'mosaic' ? 'secondary' : 'inherit'}
                        >
                            <ViewModuleOutlinedIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => handlePlaylistDisplayMode('list')}
                            color={playlistActiveDisplayMode === 'list' ? 'secondary' : 'inherit'}
                        >
                            <ListOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </Box>
            </AppBar>

            {playlistsListData && playlistActiveDisplayMode === 'mosaic' && (
                <MosaicMode
                    playlistsListData={playlistsListData}
                    handlePlaylistClickOnList={handlePlaylistClickOnList}
                />
            )}

            {playlistsListData && playlistActiveDisplayMode === 'list' && (
                <ListMode playlistsListData={playlistsListData} handlePlaylistClickOnList={handlePlaylistClickOnList} />
            )}

            {/* {isLoaded && !playlistsListData && <div>Rien</div>} */}

            {isLoading && <MosaicModeSkeleton />}

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
        </div>
    )
}

export default PlaylistList
