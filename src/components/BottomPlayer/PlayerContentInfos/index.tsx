import {Avatar, Skeleton, Stack, Typography} from '@mui/material';
import {useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {getThumbnailsFromItem} from '../../../utils/Functions';
import {useFetchVideoData} from '../hook';

function PlayerContentInfos({playerVideoId}: {playerVideoId: string}) {
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const {areVideoDataLoading, areVideoDataLoaded, videoData} = useFetchVideoData(userAccessToken, playerVideoId);

    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            {videoData && areVideoDataLoaded && (
                <Avatar
                    className="avatar-thumbnail"
                    sx={{width: 79, height: 54}}
                    alt={videoData.snippet.title}
                    src={getThumbnailsFromItem(videoData)}
                    variant="square"
                />
            )}
            {areVideoDataLoading && <Skeleton variant="rectangular" width={80} height={50} />}
            <div className="info">
                <Typography className="video-info title" variant="h6" color="text.primary">
                    {videoData && areVideoDataLoaded && videoData.snippet.title}
                    {areVideoDataLoading && <Skeleton variant="text" />}
                </Typography>

                <Typography className="video-info author" variant="body2" color="text.secondary">
                    {videoData && areVideoDataLoaded && videoData.snippet.channelTitle}
                    {areVideoDataLoading && <Skeleton variant="text" />}
                </Typography>
            </div>
        </Stack>
    );
}

export default PlayerContentInfos;
