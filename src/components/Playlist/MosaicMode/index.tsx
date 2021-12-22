import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

import './styles.css'

interface EnumPlaylistsMoasicData {
    id: string
    snippet: {
        localized: {
            title: string
            description: string
        }
        thumbnails: {
            high: {
                url: string
            }
        }
    }
}

interface IPlaylistsMosaicData {
    items: Array<EnumPlaylistsMoasicData>
}

function MosaicMode({
    playlistsListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsMosaicData
    handlePlaylistClickOnList: Function
}) {
    return (
        <Grid
            container
            direction="row"
            rowSpacing={4}
            columnSpacing={4}
            alignItems="flex-start"
            className="grid-container"
        >
            {playlistsListData.items?.map((PlaylistData, index) => (
                <Grid key={PlaylistData.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="194"
                            image={PlaylistData.snippet.thumbnails.high.url}
                            alt={PlaylistData.snippet.localized.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className="card-title">
                                {PlaylistData.snippet.localized.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="card-description">
                                {PlaylistData.snippet.localized.description === ''
                                    ? 'Aucune description'
                                    : PlaylistData.snippet.localized.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <IconButton aria-label="edit" onClick={() => handlePlaylistClickOnList(PlaylistData.id)}>
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default MosaicMode
