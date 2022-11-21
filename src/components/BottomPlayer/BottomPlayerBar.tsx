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
import React, {useEffect, useRef, useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import {getThumbnailsFromItem, toHHMMSS} from '../../utils/Functions';
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                if (player?.playerInfo.duration !== undefined && progress === 0) {
                    setDuration(player.playerInfo.duration);
                }

                if (player?.playerInfo.currentTime !== undefined) {
                    setCurrentTime(player.playerInfo.currentTime);
                }

                const newProgress = (currentTime / duration) * 100;
                setProgress(newProgress);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 250);

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

    const handleInputChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            player.seekTo(value);
        }
    };

    function valuetext(value: string) {
        return `${value}°C`;
    }

    return playlistId !== undefined ? (
        <>
            <AppBar className="bottom-player-bar" position="fixed" sx={{bottom: 0}}>
                <Box className="seek-bar-wrapper" sx={{width: '100%'}}>
                    <Slider
                        className="seek-bar"
                        value={currentTime}
                        min={0}
                        max={duration}
                        color="secondary"
                        onChange={handleInputChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={toHHMMSS}
                    ></Slider>
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
                            <Typography className="timer" variant="body2" color="text.secondary">
                                <div>{toHHMMSS(currentTime)}</div>
                                <div> / </div>
                                <div>{toHHMMSS(duration)}</div>
                            </Typography>
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
