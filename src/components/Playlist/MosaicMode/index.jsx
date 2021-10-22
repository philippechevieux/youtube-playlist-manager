import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

function MosaicMode({ playlistsListData }) {
    return (
        <Grid container direction="row" rowSpacing={4} columnSpacing={4} alignItems="flex-start">
            {playlistsListData.items?.map((PlaylistData, index) => (
                <Grid key={PlaylistData.id} item xs={3}>
                    <Card>
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
                </Grid>
            ))}
        </Grid>
    )
}

export default MosaicMode
