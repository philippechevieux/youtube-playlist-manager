import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'

import { IPlaylistsData } from '../../../utils/context/interface'
import './styles.css'

function MosaicMode({
    playlistsListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsData
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
                    <Card className="card">
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
                        <CardActions className="card-actions">
                            <IconButton aria-label="share">
                                <ShareOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="edit" onClick={() => handlePlaylistClickOnList(PlaylistData.id)}>
                                <LaunchOutlinedIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default MosaicMode
