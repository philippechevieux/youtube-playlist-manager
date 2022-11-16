import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {PauseOutlined, SkipPreviousOutlined} from '@mui/icons-material';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import YoutubeIFrame from './YoutubeIFrame';

function BottomPlayer({playedVideoId}: {playedVideoId: string | undefined}) {
    const [player, setPlayer] = useState<YouTubeEvent['target']>();
    const [isVideoPaused, setIsVideoPaused] = useState(false);

    const onPlayPauseClick = () => {
        setIsVideoPaused(!isVideoPaused);
        isVideoPaused ? player.playVideo() : player.pauseVideo();
    };

    return playedVideoId !== undefined ? (
        <>
            <AppBar position="fixed" sx={{bottom: 0}}>
                <Toolbar>
                    {playedVideoId}
                    <IconButton color="inherit">
                        <SkipPreviousOutlined />
                    </IconButton>
                    <IconButton color="inherit" onClick={onPlayPauseClick}>
                        {isVideoPaused ? <PlayArrowOutlined /> : <PauseOutlined />}
                    </IconButton>
                    <IconButton color="inherit">
                        <SkipNextOutlined />
                    </IconButton>
                    <IconButton color="inherit">
                        <VolumeUpOutlined />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <br />
            <br />
            <YoutubeIFrame playedVideoId={playedVideoId} setPlayer={setPlayer} />
        </>
    ) : (
        <></>
    );
}

export default BottomPlayer;
