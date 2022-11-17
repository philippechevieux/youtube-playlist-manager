import {ListItem, ListItemAvatar} from '@material-ui/core';
import {Avatar, IconButton, ListItemText, Tooltip, Typography} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {useTranslation} from 'react-i18next';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import {IPlaylistItemsContent} from '../../utils/context/interface';
import './styles.css';
import {PlayArrow} from '@mui/icons-material';

function VideoItem({
    Item,
    handleDeleteClick,
    handleMoreMenu,
    handleAvatarClick
}: {
    Item: ItemInterface;
    handleDeleteClick: Function;
    handleMoreMenu: Function;
    handleAvatarClick: Function;
}) {
    const {t} = useTranslation();

    const getThumbnailsFromItem = (Item: IPlaylistItemsContent): string => {
        let pathOrUrlOfThumbnails = '';

        if (Item.snippet.thumbnails !== undefined) {
            if (Item.snippet.thumbnails.high !== undefined) {
                pathOrUrlOfThumbnails = Item.snippet.thumbnails.high.url;
            }
        }

        return pathOrUrlOfThumbnails;
    };

    return (
        <ListItem className="item">
            <ListItemAvatar>
                <div className="avatar-wrapper" onClick={() => handleAvatarClick()}>
                    <PlayArrow className="avatar-play-icon" />
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
