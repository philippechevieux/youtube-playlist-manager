import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {SkipPreviousOutlined} from '@mui/icons-material';
import {AppBar, IconButton, Toolbar} from '@mui/material';

function BottomPlayer({visible}: {visible: Boolean}) {
    return (
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
    );
}

export default BottomPlayer;
