import {ListItem, ListItemAvatar} from '@material-ui/core';
import {Avatar, IconButton, ListItemText, Tooltip, Typography} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {useTranslation} from 'react-i18next';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import './styles.css';
import {PlayArrow, VolumeUpOutlined} from '@mui/icons-material';
import {getThumbnailsFromItem} from '../../utils/Functions';

function VideoItem({
    Item,
    isVideoPlaying,
    handleDeleteClick,
    handleMoreMenu,
    handleAvatarClick
}: {
    Item: ItemInterface;
    isVideoPlaying: boolean;
    handleDeleteClick: Function;
    handleMoreMenu: Function;
    handleAvatarClick: Function;
}) {
    const {t} = useTranslation();

    return (
        <ListItem className={`item ${isVideoPlaying ? 'video-playing' : ''}`}>
            <ListItemAvatar>
                <div className="avatar-wrapper" onClick={() => handleAvatarClick()}>
                    {!isVideoPlaying && <PlayArrow className="avatar-play-icon" />}
                    {isVideoPlaying && <VolumeUpOutlined className="avatar-volume-icon" />}
                    <Avatar
                        className="avatar-thumbnail"
                        sx={{width: 120, height: 85}}
                        alt={Item.snippet.title}
                        src={getThumbnailsFromItem(Item)}
                        variant="square"
                    />
                </div>
            </ListItemAvatar>
            <ListItemText
                className="list-item-text list-item-text-margin"
                primary={
                    <Typography className="primary" variant="h6" color="text.primary">
                        {Item.snippet.title}
                    </Typography>
                }
                secondary={
                    <Typography className="secondary" variant="body2" color="text.secondary">
                        {Item.snippet.videoOwnerChannelTitle}
                    </Typography>
                }
            />
            <Tooltip title={t('delete')}>
                <IconButton size="large" aria-haspopup="true" onClick={() => handleDeleteClick(Item.id)}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('other actions')}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    aria-controls="menu-more"
                    onClick={event => handleMoreMenu(event, Item.snippet.resourceId, Item.id)}
                >
                    <MoreVertOutlinedIcon />
                </IconButton>
            </Tooltip>
        </ListItem>
    );
}

export default VideoItem;
