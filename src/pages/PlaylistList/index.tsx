import { useEffect, useState, useCallback } from 'react'
import { getYoutubePlaylists } from '../../utils/api'

import { AppBar, Toolbar, IconButton, Button, Box, Typography, Tooltip } from '@mui/material'

import './styles.css'

import MosaicMode from '../../components/Playlist/MosaicMode'
import MosaicModeSkeleton from '../../components/Playlist/MosaicMode/Skeleton'
import ListMode from '../../components/Playlist/ListMode'

import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import { useHistory } from 'react-router-dom'
// import { IPlaylistsData } from '../../utils/context/interface'
// import { IPlaylistsItemData } from './../../utils/context/interface'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUserAccessToken } from '../../utils/arms/user/selectors'
import { addPlaylists } from '../../utils/arms/playlists/reducer'
import { useFetchPlaylists } from './hook'
import { selectPlaylistsItems, selectPlaylistsNextPageToken } from '../../utils/arms/playlists/selectors'
import { ItemInterface } from '../../utils/arms/playlists/state'

function PlaylistList() {
    let history = useHistory()

    const userAccessToken = useAppSelector(selectUserAccessToken)
    const nextPageTokenInStore = useAppSelector(selectPlaylistsNextPageToken)
    const playlistsItems = useAppSelector(selectPlaylistsItems)

    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)

    const { arePlaylistsLoading, arePlaylistsLoaded } = useFetchPlaylists(userAccessToken, nextPageToken)

    // const dispatch = useAppDispatch()
    // const [isLoading, setIsLoading] = useState(false)
    // const [isLoaded, setIsLoaded] = useState(false)
    // const [nextPageToken, setNextPageToken] = useState('')
    // const [playlistsListData, setPlaylistsListData] = useState<IPlaylistsData>({ items: [] })
    const [playlistActiveDisplayMode, setPlaylistActiveDisplayMode] = useState('mosaic')

    const handlePlaylistDisplayMode = (mode: string) => {
        if (mode !== playlistActiveDisplayMode) {
            setPlaylistActiveDisplayMode(mode)
        }
    }

    const handlePlaylistClickOnList = (id: string) => {
        history.push('/playlist/' + id)
    }

    const updatePlaylistListData = (data: ItemInterface) => {
        // const playlistId = data.id
        // const newPlaylistIems = playlistsListData.items.map((item) => {
        //     if (item.id === playlistId) {
        //         item = data
        //     }
        //     return item
        // })
        // playlistsListData.items = newPlaylistIems
        // setPlaylistsListData(playlistsListData)
    }

    const loadMorePlaylistList = () => {
        setNextPageToken(nextPageTokenInStore)
    }

    return (
        <div className="playlist-list">
            <AppBar position="static">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <Typography variant="body1" color="text.primary">
                            Trier
                        </Typography>
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
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="body1" color="text.primary">
                            Affichage
                        </Typography>
                        <Tooltip title="Mosaic">
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handlePlaylistDisplayMode('mosaic')}
                                color={playlistActiveDisplayMode === 'mosaic' ? 'secondary' : 'inherit'}
                            >
                                <ViewModuleOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Liste">
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handlePlaylistDisplayMode('list')}
                                color={playlistActiveDisplayMode === 'list' ? 'secondary' : 'inherit'}
                            >
                                <ListOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Box>
            </AppBar>

            {playlistsItems && playlistActiveDisplayMode === 'mosaic' && (
                <MosaicMode
                    playlistsListData={{ items: playlistsItems }}
                    updatePlaylistListData={updatePlaylistListData}
                    handlePlaylistClickOnList={handlePlaylistClickOnList}
                />
            )}

            {playlistsItems && playlistActiveDisplayMode === 'list' && (
                <ListMode
                    playlistsListData={{ items: playlistsItems }}
                    updatePlaylistListData={updatePlaylistListData}
                    handlePlaylistClickOnList={handlePlaylistClickOnList}
                />
            )}

            {arePlaylistsLoaded && playlistsItems.length === 0 && <div>Rien</div>}

            {arePlaylistsLoading && <MosaicModeSkeleton />}

            {!arePlaylistsLoading && nextPageTokenInStore !== undefined && (
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
