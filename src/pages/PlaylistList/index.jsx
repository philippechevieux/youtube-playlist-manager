import { useEffect, useContext, useState } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'

import { Breadcrumbs, Typography } from '@mui/material'

import './styles.css'
import MosaicItem from '../../components/Playlist/MosaicItem'
import HomeIcon from '@mui/icons-material/Home'

function PlaylistList() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)
    const [playlistsListData, setPlaylistsListData] = useState(null)

    useEffect(() => {
        console.log('playlist list : ', googleAccountData)

        getYoutubePlaylists(googleAccountData.accessToken).then((data) => {
            console.log('setPlaylistsList', data)
            setPlaylistsListData(data)
        })
    }, [googleAccountData])

    //TODO:
    // - Affichage Mosaic, Affichage Liste
    // - Trie par : Date de création ASC/DESC puis voir pour d'autres possibilités

    return (
        <div>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    {/* <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Mes Playlists
                    </Link> */}
                    <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Mes playlists
                    </Typography>
                </Breadcrumbs>
            </div>

            {!playlistsListData ? <div>Rien</div> : <MosaicItem playlistsListData={playlistsListData} />}
        </div>
    )
}

export default PlaylistList
