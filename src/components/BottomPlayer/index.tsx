import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {SkipPreviousOutlined} from '@mui/icons-material';
import {AppBar, IconButton, Toolbar} from '@mui/material';
import YouTube, {YouTubeProps} from 'react-youtube';

function BottomPlayer({visible}: {visible: Boolean}) {
    const onPlayerReady: YouTubeProps['onReady'] = event => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    return (
        <>
            <AppBar position="fixed" sx={{bottom: 0}}>
                <Toolbar>
                    <IconButton color="inherit">
                        <SkipPreviousOutlined />
                    </IconButton>
                    <IconButton color="inherit">
                        <PlayArrowOutlined />
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
            <YouTube videoId="2g811Eo7K8U" onReady={onPlayerReady} opts={{height: '100px', width: '250px'}} />
        </>
    );
}

export default BottomPlayer;
