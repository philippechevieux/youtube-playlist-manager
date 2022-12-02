import {ArrowDropDownOutlined, ShuffleOutlined, VolumeOffOutlined, VolumeUpOutlined} from '@mui/icons-material';
import {IconButton, Slider, Stack} from '@mui/material';
import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';

function PlayerOtherActions({
    player,
    isIFrameToggled,
    setIsIFrameToggled
}: {
    player: YouTubeEvent['target'];
    isIFrameToggled: boolean;
    setIsIFrameToggled: Function;
}) {
    const [volume, setVolume] = useState<number | number[]>(100);
    const [shouldSliderBeDisplayed, setShouldSliderBeDisplayed] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const onVolumeChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setVolume(value);
            player.setVolume(volume);
        }
    };

    const onMuteUnMuteClick = () => {
        setIsMuted(!isMuted);
        isMuted ? player.unMute() : player.mute();
    };

    return (
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Slider
                className={`volume-slider ${!shouldSliderBeDisplayed ? 'hidden' : ''}`}
                size="small"
                value={volume}
                onChange={onVolumeChange}
                onMouseEnter={() => setShouldSliderBeDisplayed(true)}
                onMouseLeave={() => setShouldSliderBeDisplayed(false)}
            />
            <IconButton
                className="volume-icon"
                color="inherit"
                onClick={onMuteUnMuteClick}
                onMouseEnter={() => setShouldSliderBeDisplayed(true)}
                onMouseLeave={() => setShouldSliderBeDisplayed(false)}
            >
                {isMuted ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
            </IconButton>
            <IconButton color="inherit" onClick={() => {}}>
                <ShuffleOutlined />
            </IconButton>
            <IconButton color="inherit" onClick={() => setIsIFrameToggled(!isIFrameToggled)}>
                <ArrowDropDownOutlined className="drop-down-up-icon" fontSize="large" />
            </IconButton>
        </Stack>
    );
}

export default PlayerOtherActions;
