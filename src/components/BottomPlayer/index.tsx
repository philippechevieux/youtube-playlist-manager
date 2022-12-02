import {AppBar, Box, Grid, Toolbar} from '@mui/material';
import {useState} from 'react';
import YouTube, {YouTubeEvent} from 'react-youtube';
import {useAppSelector} from '../../app/hooks';
import {selectPlaylistContentsItemsByIndex} from '../../utils/arms/playlistContents/selectors';
import SeekBar from './SeekBar';
import './styles.css';
import PlayerControlActions from './PlayerControlActions';
import PlayerOtherActions from './PlayerOtherActions';
import PlayerContentInfos from './PlayerContentInfos';

export enum playerStateEnum {
    NOT_INICIATED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
}

function BottomPlayer({
    player,
    setPlayer,
    isPlayerPaused,
    setIsPlayerPaused,
    playlistId,
    playerVideoIndex,
    setPlayerVideoIndex,
    setPlayerVideoId,
    visible
}: {
    player: YouTubeEvent['target'];
    setPlayer: Function;
    isPlayerPaused: boolean;
    setIsPlayerPaused: Function;
    playlistId: string;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    setPlayerVideoId: Function;
    visible: boolean;
}) {
    const contentItem = useAppSelector(state =>
        selectPlaylistContentsItemsByIndex(state, playlistId, playerVideoIndex)
    );

    const [isIFrameToggled, setIsIFrameToggled] = useState(false);
    const [playerState, setPlayerState] = useState(playerStateEnum.NOT_INICIATED);

    return (
        <div className={`bottom-player ${!visible ? 'hidden' : ''}`}>
            {playlistId !== undefined && (
                <AppBar className={`bottom-player-bar ${isIFrameToggled ? 'toggle' : ''}`} sx={{bottom: 0}}>
                    <Box className="youtube-iframe-wrapper" sx={{width: '100%'}}>
                        <YouTube
                            className="youtube-iframe"
                            onReady={e => {
                                setPlayer(e.target);

                                if (playerVideoIndex !== undefined) {
                                    e.target.playVideoAt(playerVideoIndex);
                                }
                            }}
                            onStateChange={e => {
                                setPlayerState(e.target.playerInfo.playerState);
                                setPlayerVideoId(e.target.playerInfo.videoData.video_id);
                                setPlayerVideoIndex(e.target.playerInfo.playlistIndex);
                            }}
                            onPlay={() => setIsPlayerPaused(false)}
                            onPause={() => setIsPlayerPaused(true)}
                            opts={{height: '100%', width: '100%', playerVars: {controls: 0, list: playlistId}}}
                        />
                    </Box>
                    <Box className="seek-bar-wrapper" sx={{width: '100%'}}>
                        <SeekBar player={player} />
                    </Box>
                    <Toolbar>
                        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                            <Grid item xs={4}>
                                <PlayerControlActions
                                    player={player}
                                    playerState={playerState}
                                    isPlayerPaused={isPlayerPaused}
                                    setIsPlayerPaused={setIsPlayerPaused}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {contentItem !== undefined && <PlayerContentInfos contentItem={contentItem} />}
                            </Grid>
                            <Grid item xs={4} textAlign={'end'} width={'100%'}>
                                <PlayerOtherActions
                                    player={player}
                                    isIFrameToggled={isIFrameToggled}
                                    setIsIFrameToggled={setIsIFrameToggled}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            )}
        </div>
    );
}

export default BottomPlayer;
