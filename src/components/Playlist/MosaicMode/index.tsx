import {Card, CardActions, CardContent, CardMedia, Grid, Tooltip, Typography} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import './styles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {ItemsInterface} from '../../../utils/arms/playlists/state';

function MosaicMode({
    playlistsListData,
    onClickOnEditPlaylist,
    onClickOnOpenPlaylist
}: {
    playlistsListData: ItemsInterface;
    onClickOnEditPlaylist: Function;
    onClickOnOpenPlaylist: Function;
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
                            <Tooltip title="Editer">
                                <IconButton aria-label="edit" onClick={() => onClickOnEditPlaylist(PlaylistData.id)}>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Ouvrir la playlist">
                                <IconButton
                                    aria-label="open playlist"
                                    onClick={() => onClickOnOpenPlaylist(PlaylistData.id)}
                                >
                                    <LaunchOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default MosaicMode;
