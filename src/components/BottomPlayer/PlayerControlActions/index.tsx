import {PauseOutlined, PlayArrowOutlined, SkipNextOutlined, SkipPreviousOutlined} from '@mui/icons-material';
import {CircularProgress, IconButton, Tooltip, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
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
    const {t} = useTranslation();

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
            <Tooltip title={t('previous title')}>
                <IconButton color="inherit" onClick={onPreviousClick}>
                    <SkipPreviousOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title={isPlayerPaused ? t('play') : t('pause')}>
                <IconButton color="inherit" onClick={onPlayPauseClick}>
                    {displayPlayButton()}
                </IconButton>
            </Tooltip>
            <Tooltip title={t('next title')}>
                <IconButton color="inherit" onClick={onNextClick}>
                    <SkipNextOutlined />
                </IconButton>
            </Tooltip>
            <Timer player={player} />
        </>
    );
}

export default PlayerControlActions;
