import {
    ArrowDropDownOutlined,
    ShuffleOnOutlined,
    ShuffleOutlined,
    VolumeOffOutlined,
    VolumeUpOutlined
} from '@mui/icons-material';
import {IconButton, Slider, Stack, Tooltip} from '@mui/material';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {playerStateInterface} from '../../../containers/Body/types';

interface PlayerOtherActionsProps {
    playerState: playerStateInterface;
    isIFrameToggled: boolean;
    setIsIFrameToggled: Function;
}

const PlayerOtherActions: React.FC<PlayerOtherActionsProps> = ({playerState, isIFrameToggled, setIsIFrameToggled}) => {
    const {t} = useTranslation();

    const [volume, setVolume] = useState<number | number[]>(100);
    const [shouldSliderBeDisplayed, setShouldSliderBeDisplayed] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    const onVolumeChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setVolume(value);
            playerState.player.setVolume(volume);
        }
    };

    const onMuteUnMuteClick = () => {
        setIsMuted(!isMuted);
        isMuted ? playerState.player.unMute() : playerState.player.mute();
    };

    const onShuffleClick = () => {
        const newIsShuffle = !isShuffle;

        setIsShuffle(newIsShuffle);
        playerState.player.setShuffle(newIsShuffle);
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
                {isMuted ? (
                    <Tooltip title={t('unmute')}>
                        <VolumeOffOutlined />
                    </Tooltip>
                ) : (
                    <Tooltip title={t('mute')}>
                        <VolumeUpOutlined />
                    </Tooltip>
                )}
            </IconButton>
            <IconButton color="inherit" onClick={onShuffleClick}>
                {isShuffle ? (
                    <Tooltip title={t('classic playback')}>
                        <ShuffleOnOutlined />
                    </Tooltip>
                ) : (
                    <Tooltip title={t('shuffle playback')}>
                        <ShuffleOutlined />
                    </Tooltip>
                )}
            </IconButton>
            <IconButton color="inherit" onClick={() => setIsIFrameToggled(!isIFrameToggled)}>
                <ArrowDropDownOutlined className="drop-down-up-icon" fontSize="large" />
            </IconButton>
        </Stack>
    );
};

export default PlayerOtherActions;
