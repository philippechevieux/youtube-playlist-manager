import {ListItem, ListItemAvatar} from '@material-ui/core';
import {Avatar, IconButton, ListItemText, Tooltip, Typography} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {useTranslation} from 'react-i18next';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import './styles.css';
import {PauseOutlined, PlayArrow, VolumeUpOutlined} from '@mui/icons-material';
import {getThumbnailsFromItem} from '../../utils/Functions';
import {useState} from 'react';

interface VideoItemProps {
    Item: ItemInterface;
    isVideoCued?: boolean;
    isPlayerPaused?: boolean;
    handleDeleteClick?: Function;
    handleMoreMenu?: Function;
    handleAvatarClick?: Function;
}

const VideoItem: React.FC<VideoItemProps> = ({
    Item,
    isVideoCued,
    isPlayerPaused,
    handleDeleteClick,
    handleMoreMenu,
    handleAvatarClick
}) => {
    const {t} = useTranslation();

    const [isVideoHovered, setIsVideoHovered] = useState(false);

    const displayAvatarIcon = () => {
        if (isVideoHovered && isVideoCued && !isPlayerPaused) {
            return <PauseOutlined className="avatar-volume-icon" />;
        }

        if (isVideoCued && !isPlayerPaused) {
            return <VolumeUpOutlined className="avatar-volume-icon" />;
        }

        return <PlayArrow className={`avatar-play-icon ${isVideoCued && isPlayerPaused ? 'video-paused' : ''}`} />;
    };

    return (
        <ListItem className={`video-item ${isVideoCued ? 'video-playing' : ''}`}>
            <ListItemAvatar>
                <div
                    className="avatar-wrapper"
                    onClick={() => handleAvatarClick && handleAvatarClick()}
                    onMouseEnter={() => setIsVideoHovered(true)}
                    onMouseLeave={() => setIsVideoHovered(false)}
                >
                    {displayAvatarIcon()}
                    <Avatar
                        className="avatar-thumbnail"
                        alt={Item.snippet.title}
                        src={getThumbnailsFromItem(Item)}
                        variant="square"
                    />
                </div>
            </ListItemAvatar>
            <ListItemText
                className="list-item-text list-item-text-margin"
                primary={
                    <Typography className="primary" variant="h6">
                        {Item.snippet.title}
                    </Typography>
                }
                secondary={
                    <Typography className="secondary" variant="body2" color="text.secondary">
                        {Item.snippet.videoOwnerChannelTitle}
                    </Typography>
                }
            />

            {handleDeleteClick && (
                <Tooltip title={t('delete')}>
                    <IconButton size="large" aria-haspopup="true" onClick={() => handleDeleteClick(Item.id)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            )}
            {handleMoreMenu && (
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
            )}
        </ListItem>
    );
};

export default VideoItem;
