import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Tooltip, Typography} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import './styles.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {ItemsInterface} from '../../../utils/arms/playlists/state';
import {useTranslation} from 'react-i18next';

function MosaicMode({
    playlistsListData,
    onClickOnEditPlaylist,
    onClickOnOpenPlaylist
}: {
    playlistsListData: ItemsInterface;
    onClickOnEditPlaylist: Function;
    onClickOnOpenPlaylist: Function;
}) {
    const {t} = useTranslation();

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
                <Grid key={PlaylistData.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Card className="card">
                        <CardMedia
                            className="open-playlist-pointer"
                            component="img"
                            height="194"
                            image={PlaylistData.snippet.thumbnails.high.url}
                            alt={PlaylistData.snippet.localized.title}
                            onClick={() => onClickOnOpenPlaylist(PlaylistData.id)}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                className="card-title open-playlist-pointer"
                                onClick={() => onClickOnOpenPlaylist(PlaylistData.id)}
                            >
                                {PlaylistData.snippet.localized.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="card-description">
                                {PlaylistData.snippet.localized.description === ''
                                    ? t('no description')
                                    : PlaylistData.snippet.localized.description}
                            </Typography>
                        </CardContent>
                        <CardActions className="card-actions">
                            <Tooltip title={t('edit')}>
                                <IconButton onClick={() => onClickOnEditPlaylist(PlaylistData.id)}>
                                    <EditOutlinedIcon />
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
