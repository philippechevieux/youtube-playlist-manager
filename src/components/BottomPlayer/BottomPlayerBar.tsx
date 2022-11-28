import {PlayArrowOutlined, SkipNextOutlined, VolumeUpOutlined} from '@material-ui/icons';
import {ArrowDropDownOutlined, PauseOutlined, SkipPreviousOutlined, VolumeOffOutlined} from '@mui/icons-material';
import {AppBar, Avatar, Box, Grid, IconButton, Slider, Stack, Toolbar, Typography} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import YouTube, {YouTubeEvent} from 'react-youtube';
import {ItemInterface} from '../../utils/arms/playlistContents/state';
import {getThumbnailsFromItem, toHHMMSS} from '../../utils/Functions';
import './styles.css';

function BottomPlayerBar({
    playlistId,
    player,
    setPlayer,
    playerVideoIndex,
    setPlayerVideoIndex,
    contentItem,
    isPlayerPaused,
    setIsPlayerPaused
}: {
    playlistId: string | undefined;
    player: YouTubeEvent['target'];
    setPlayer: Function;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    contentItem: ItemInterface | undefined;
    isPlayerPaused: boolean;
    setIsPlayerPaused: Function;
}) {
    const [shouldSliderBeDisplayed, setShouldSliderBeDisplayed] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState<number | number[]>(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isIFrameToggled, setIsIFrameToggled] = useState(false);

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
        setIsPlayerPaused(!isPlayerPaused);
        isPlayerPaused ? player.playVideo() : player.pauseVideo();
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

    return playlistId !== undefined ? (
        <AppBar className={`bottom-player-bar ${isIFrameToggled ? 'toggle' : ''}`} sx={{bottom: 0}}>
            <Box className="youtube-iframe-wrapper" sx={{width: '100%'}}>
                <YouTube
                    className="youtube-iframe"
                    onReady={e => {
                        console.log('iframe ready');
                        console.log('target : ', e.target);
                        console.log('playlistId to cue : ', playlistId);

                        setPlayer(e.target);
                        setVolume(e.target.getVolume());

                        if (playerVideoIndex) {
                            e.target.playVideoAt(playerVideoIndex);
                        }
                    }}
                    onStateChange={e => {
                        setPlayerVideoIndex(e.target.playerInfo.playlistIndex);
                    }}
                    onPlay={() => setIsPlayerPaused(false)}
                    onPause={() => setIsPlayerPaused(true)}
                    opts={{height: '100%', width: '100%', playerVars: {controls: 0, list: playlistId}}}
                />
            </Box>
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
                            {isPlayerPaused ? <PlayArrowOutlined /> : <PauseOutlined />}
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

                                    <Typography className="video-info author" variant="body2" color="text.secondary">
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
                            <IconButton color="inherit" onClick={() => setIsIFrameToggled(!isIFrameToggled)}>
                                <ArrowDropDownOutlined className="drop-down-up-icon" fontSize="large" />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    ) : (
        <></>
    );
}

export default BottomPlayerBar;
