import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {PauseOutlined, SkipPreviousOutlined, VolumeOffOutlined} from '@mui/icons-material';
import {AppBar, IconButton, Slider, Toolbar} from '@mui/material';
import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';

function BottomPlayerBar({
    playlistId,
    player,
    isVideoPaused,
    setIsVideoPaused,
    volume,
    setVolume,
    isMuted,
    setIsMuted
}: {
    playlistId: string | undefined;
    player: YouTubeEvent['target'];
    isVideoPaused: boolean;
    setIsVideoPaused: Function;
    volume: number | number[];
    setVolume: Function;
    isMuted: boolean;
    setIsMuted: Function;
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

    const onVolumeChange = (e: Event, value: number | number[]) => {
        setVolume(value); //TODO: check later is this set is usefull (maybe to sync iframe volume slider)
        player.setVolume(volume);
    };

    const onMuteUnMuteClick = () => {
        setIsMuted(!isMuted);
        isMuted ? player.unMute() : player.mute();
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
                <div className="volume-wrapper">
                    <Slider size="small" min={0} max={100} value={volume} onChange={onVolumeChange} />
                    <IconButton color="inherit" onClick={onMuteUnMuteClick}>
                        {isMuted ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    ) : (
        <></>
    );
}

export default BottomPlayerBar;
