import {Avatar, Stack, Typography} from '@mui/material';
import {ItemInterface} from '../../../utils/arms/playlistContents/state';
import {getThumbnailsFromItem} from '../../../utils/Functions';

function PlayerContentInfos({contentItem}: {contentItem: ItemInterface}) {
    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
            <Avatar
                className="avatar-thumbnail"
                sx={{width: 79, height: 54}}
                alt={contentItem.snippet.title}
                src={getThumbnailsFromItem(contentItem)}
                variant="square"
            />
            <div className="info">
                <Typography className="video-info title" variant="h6" color="text.primary">
                    {contentItem.snippet.title}
                </Typography>

                <Typography className="video-info author" variant="body2" color="text.secondary">
                    {contentItem.snippet.videoOwnerChannelTitle}
                </Typography>
            </div>
        </Stack>
    );
}

export default PlayerContentInfos;
