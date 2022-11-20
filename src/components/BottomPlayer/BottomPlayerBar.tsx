import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {PauseOutlined, SkipPreviousOutlined, VolumeOffOutlined} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Grid,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Slider,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import {getThumbnailsFromItem} from '../../utils/Functions';
import './styles.css';

function BottomPlayerBar({
    playlistId,
    player,
    contentItem,
    isVideoPaused,
    setIsVideoPaused,
    volume,
    setVolume,
    isMuted,
    setIsMuted
}: {
    playlistId: string | undefined;
    player: YouTubeEvent['target'];
    contentItem: ItemInterface | undefined;
    isVideoPaused: boolean;
    setIsVideoPaused: Function;
    volume: number | number[];
    setVolume: Function;
    isMuted: boolean;
    setIsMuted: Function;
}) {
    const [shouldSliderBeDisplayed, setShouldSliderBeDisplayed] = useState(false);
    const [progress, setProgress] = useState(0);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const currentTime = player?.playerInfo.currentTime !== undefined ? player.playerInfo.currentTime : 0;
                const duration = player?.playerInfo.duration !== undefined ? player.playerInfo.duration : 100;

                const newProgress = (currentTime / duration) * 100;
                setProgress(newProgress);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

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
        setVolume(value);
        player.setVolume(volume);
    };

    const onMuteUnMuteClick = () => {
        setIsMuted(!isMuted);
        isMuted ? player.unMute() : player.mute();
    };

    return playlistId !== undefined ? (
        <>
            <AppBar className="bottom-player-bar" position="fixed" sx={{bottom: 0}}>
                <Box sx={{width: '100%'}}>
                    <LinearProgress className="progress-bar" variant="determinate" value={progress} color="secondary" />
                </Box>
                <Toolbar>
                    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                        <Grid item xs={4}>
                            <IconButton color="inherit" onClick={onPreviousClick}>
                                <SkipPreviousOutlined />
                            </IconButton>
                            <IconButton color="inherit" onClick={onPlayPauseClick}>
                                {isVideoPaused ? <PlayArrowOutlined /> : <PauseOutlined />}
                            </IconButton>
                            <IconButton color="inherit" onClick={onNextClick}>
                                <SkipNextOutlined />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                            {contentItem !== undefined && (
                                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                    <Avatar
                                        className="avatar-thumbnail"
                                        sx={{width: 79, height: 54}}
                                        alt={contentItem.snippet.title}
                                        src={getThumbnailsFromItem(contentItem)}
                                        variant="square"
                                    />
                                    <div className="info">
                                        <Typography className="video-info title" variant="h6" color="text.primary">
                                            {contentItem.snippet.title}
                                        </Typography>

                                        <Typography
                                            className="video-info author"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {contentItem.snippet.videoOwnerChannelTitle}
                                        </Typography>
                                    </div>
                                </Stack>
                            )}
                        </Grid>
                        <Grid item xs={4} textAlign={'end'} width={'100%'}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center">
                                <Slider
                                    className={`volume-slider ${!shouldSliderBeDisplayed ? 'hidden' : ''}`}
                                    size="small"
                                    min={0}
                                    max={100}
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
                            </Stack>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    ) : (
        <></>
    );
}

export default BottomPlayerBar;
