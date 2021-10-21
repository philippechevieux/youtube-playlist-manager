import { useEffect, useContext, useState } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'

import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'

import './styles.css'

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
            {!playlistsListData ? (
                <div>Rien</div>
            ) : (
                <div className="card-container">
                    {playlistsListData.items?.map((PlaylistData, index) => (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={PlaylistData.snippet.thumbnails.high.url}
                                alt={PlaylistData.snippet.localized.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {PlaylistData.snippet.localized.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Test blabla blabla blabla
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PlaylistList
