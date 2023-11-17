import {PauseOutlined, PlayArrowOutlined, SkipNextOutlined, SkipPreviousOutlined} from '@mui/icons-material';
import {CircularProgress, IconButton, Tooltip} from '@mui/material';
import {useTranslation} from 'react-i18next';
import Timer from '../Timer';
import {playerStateInterface} from '../../../containers/Body/types';
import {Dispatch, SetStateAction} from 'react';
import {playerStateEnum} from '../enums';

interface PlayerControlActionsProps {
    playerState: playerStateInterface;
    setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
    youtubePlayerState: playerStateEnum;
}

const PlayerControlActions: React.FC<PlayerControlActionsProps> = ({
    playerState,
    setPlayerState,
    youtubePlayerState
}) => {
    const {t} = useTranslation();

    const onPlayPauseClick = () => {
        setPlayerState({...playerState, isPlayerPaused: !playerState.isPlayerPaused});

        playerState.isPlayerPaused ? playerState.player.playVideo() : playerState.player.pauseVideo();
    };

    const onPreviousClick = () => {
        playerState.player.previousVideo();
    };

    const onNextClick = () => {
        playerState.player.nextVideo();
    };

    const displayPlayButton = () => {
        if ([playerStateEnum.NOT_INICIATED, playerStateEnum.BUFFERING].includes(youtubePlayerState)) {
            return <CircularProgress size={20} />;
        }

        return playerState.isPlayerPaused ? <PlayArrowOutlined /> : <PauseOutlined />;
    };

    return (
        <>
            <Tooltip title={t('previous title')}>
                <IconButton color="inherit" onClick={onPreviousClick}>
                    <SkipPreviousOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title={playerState.isPlayerPaused ? t('play') : t('pause')}>
                <IconButton color="inherit" onClick={onPlayPauseClick}>
                    {displayPlayButton()}
                </IconButton>
            </Tooltip>
            <Tooltip title={t('next title')}>
                <IconButton color="inherit" onClick={onNextClick}>
                    <SkipNextOutlined />
                </IconButton>
            </Tooltip>
            <Timer playerState={playerState} />
        </>
    );
};

export default PlayerControlActions;
