import {PauseOutlined, PlayArrowOutlined, SkipNextOutlined, SkipPreviousOutlined} from '@mui/icons-material';
import {CircularProgress, IconButton, Typography} from '@mui/material';
import {YouTubeEvent} from 'react-youtube';
import {playerStateEnum} from '..';
import Timer from '../Timer';

function PlayerControlActions({
    player,
    playerState,
    isPlayerPaused,
    setIsPlayerPaused
}: {
    player: YouTubeEvent['target'];
    playerState: playerStateEnum;
    isPlayerPaused: boolean;
    setIsPlayerPaused: Function;
}) {
    const onPlayPauseClick = () => {
        setIsPlayerPaused(!isPlayerPaused);
        isPlayerPaused ? player.playVideo() : player.pauseVideo();
    };

    const onPreviousClick = () => {
        player.previousVideo();
    };

    const onNextClick = () => {
        player.nextVideo();
    };

    const displayPlayButton = () => {
        if ([playerStateEnum.NOT_INICIATED, playerStateEnum.BUFFERING].includes(playerState)) {
            return <CircularProgress size={20} />;
        }

        return isPlayerPaused ? <PlayArrowOutlined /> : <PauseOutlined />;
    };

    return (
        <>
            <IconButton color="inherit" onClick={onPreviousClick}>
                <SkipPreviousOutlined />
            </IconButton>
            <IconButton color="inherit" onClick={onPlayPauseClick}>
                {displayPlayButton()}
            </IconButton>
            <IconButton color="inherit" onClick={onNextClick}>
                <SkipNextOutlined />
            </IconButton>
            <Typography className="timer" variant="body2" color="text.secondary">
                <Timer player={player} />
            </Typography>
        </>
    );
}

export default PlayerControlActions;
