import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {PauseOutlined, SkipPreviousOutlined} from '@mui/icons-material';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import {YouTubeEvent} from 'react-youtube';

function BottomPlayerBar({
    playlistId,
    player,
    isVideoPaused,
    setIsVideoPaused
}: {
    playlistId: string | undefined;
    player: YouTubeEvent['target'];
    isVideoPaused: boolean;
    setIsVideoPaused: Function;
}) {
    const onPlayPauseClick = () => {
        setIsVideoPaused(!isVideoPaused);
        isVideoPaused ? player.playVideo() : player.pauseVideo();
    };

    const onPreviousClick = () => {
        player.previousVideo();
    };

    const onNextClick = () => {
        player.nextVideo();
    };

    return playlistId !== undefined ? (
        <AppBar position="fixed" sx={{bottom: 0}}>
            <Toolbar>
                <IconButton color="inherit" onClick={onPreviousClick}>
                    <SkipPreviousOutlined />
                </IconButton>
                <IconButton color="inherit" onClick={onPlayPauseClick}>
                    {isVideoPaused ? <PlayArrowOutlined /> : <PauseOutlined />}
                </IconButton>
                <IconButton color="inherit" onClick={onNextClick}>
                    <SkipNextOutlined />
                </IconButton>
                <IconButton color="inherit">
                    <VolumeUpOutlined />
                </IconButton>
            </Toolbar>
        </AppBar>
    ) : (
        <></>
    );
}

export default BottomPlayerBar;
