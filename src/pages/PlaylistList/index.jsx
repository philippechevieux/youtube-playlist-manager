import { useEffect, useContext, useState } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'

import { Breadcrumbs, Typography, AppBar, Toolbar, IconButton } from '@mui/material'

import './styles.css'

import MosaicMode from '../../components/Playlist/MosaicMode'
import ListMode from '../../components/Playlist/ListMode'

import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ListIcon from '@mui/icons-material/List'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

function PlaylistList() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)
    const [playlistsListData, setPlaylistsListData] = useState(null)
    const [playlistActiveDisplayMode, setPlaylistActiveDisplayMode] = useState('mosaic')

    useEffect(() => {
        console.log('playlist list : ', googleAccountData)

        getYoutubePlaylists(googleAccountData.accessToken).then((data) => {
            console.log('setPlaylistsList', data)
            setPlaylistsListData(data)
        })
    }, [googleAccountData])

    const handlePlaylistDisplayMode = (mode) => {
        if (mode !== playlistActiveDisplayMode) {
            setPlaylistActiveDisplayMode(mode)
        }
    }

    //TODO:
    // - Trie par : Date de création ASC/DESC puis voir pour d'autres possibilités

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => handlePlaylistDisplayMode('mosaic')}
                        color={playlistActiveDisplayMode === 'mosaic' ? 'primary' : 'inherit'}
                    >
                        <ViewModuleIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => handlePlaylistDisplayMode('list')}
                        color={playlistActiveDisplayMode === 'list' ? 'primary' : 'inherit'}
                    >
                        <ListIcon />
                    </IconButton>
                    <IconButton
                        className="button-filter"
                        size="large"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick=""
                        color="inherit"
                    >
                        <FilterAltIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {!playlistsListData && <div>Rien</div>}

            {playlistsListData && playlistActiveDisplayMode === 'mosaic' && (
                <MosaicMode playlistsListData={playlistsListData} />
            )}

            {playlistsListData && playlistActiveDisplayMode === 'list' && (
                <ListMode playlistsListData={playlistsListData} />
            )}
        </div>
    )
}

export default PlaylistList
