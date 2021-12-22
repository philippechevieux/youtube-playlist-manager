import { useEffect, useContext, useState } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { UserDataContext } from '../../utils/context/userData/index'

import { AppBar, Toolbar, IconButton } from '@mui/material'

import './styles.css'

import MosaicMode from '../../components/Playlist/MosaicMode'
import ListMode from '../../components/Playlist/ListMode'

import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ListIcon from '@mui/icons-material/List'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { useHistory } from 'react-router-dom'

function PlaylistList() {
    let history = useHistory()

    const { state } = useContext(UserDataContext)
    const [playlistsListData, setPlaylistsListData] = useState(null)
    const [playlistActiveDisplayMode, setPlaylistActiveDisplayMode] = useState('mosaic')

    useEffect(() => {
        getYoutubePlaylists(state.accessToken).then((data) => {
            console.log('setPlaylistsList', data)
            setPlaylistsListData(data)
        })
    }, [state])

    const handlePlaylistDisplayMode = (mode: string) => {
        if (mode !== playlistActiveDisplayMode) {
            setPlaylistActiveDisplayMode(mode)
        }
    }

    const handlePlaylistClickOnList = (id: string) => {
        history.push('/playlist/' + id)
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
                        onClick={() => console.log('test')}
                        color="inherit"
                    >
                        <FilterAltIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {!playlistsListData && <div>Rien</div>}

            {playlistsListData && playlistActiveDisplayMode === 'mosaic' && (
                <MosaicMode
                    playlistsListData={playlistsListData}
                    handlePlaylistClickOnList={handlePlaylistClickOnList}
                />
            )}

            {playlistsListData && playlistActiveDisplayMode === 'list' && (
                <ListMode playlistsListData={playlistsListData} handlePlaylistClickOnList={handlePlaylistClickOnList} />
            )}
        </div>
    )
}

export default PlaylistList
