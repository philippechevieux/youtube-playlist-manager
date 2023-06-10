import {Box, Grid, Toolbar} from '@mui/material';
import {Dispatch, SetStateAction, useState} from 'react';
import YouTube from 'react-youtube';
import SeekBar from './SeekBar';
import './styles.css';
import PlayerControlActions from './PlayerControlActions';
import PlayerOtherActions from './PlayerOtherActions';
import PlayerContentInfos from './PlayerContentInfos';
import {playerStateInterface} from '../../containers/Body/types';
import {playerStateEnum} from './enums';

interface BottomPlayerProps {
    playerState: playerStateInterface;
    setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({playerState, setPlayerState}) => {
    const [isIFrameToggled, setIsIFrameToggled] = useState(false);
    const [youtubePlayerState, setYoutubePlayerState] = useState(playerStateEnum.NOT_INICIATED);

    return (
        <div className={`bottom-player mui-fixed ${!playerState.shouldDisplayBottomBatar ? 'hidden' : ''}`}>
            {playerState.cuePlaylistId !== undefined && (
                <div className={`bottom-player-bar ${isIFrameToggled ? 'toggle' : ''}`}>
                    <Box className="youtube-iframe-wrapper">
                        <YouTube
                            className="youtube-iframe"
                            onReady={e => {
                                setPlayerState({...playerState, player: e.target});

                                if (playerState.videoIndex !== undefined) {
                                    e.target.playVideoAt(playerState.videoIndex);
                                }
                            }}
                            onStateChange={e => {
                                setYoutubePlayerState(e.target.playerInfo.playerState);

                                setPlayerState({
                                    ...playerState,
                                    videoId: e.target.playerInfo.videoData.video_id,
                                    videoIndex: e.target.playerInfo.playlistIndex
                                });
                            }}
                            onPlay={() =>
                                setPlayerState({
                                    ...playerState,
                                    isPlayerPaused: false
                                })
                            }
                            onPause={() =>
                                setPlayerState({
                                    ...playerState,
                                    isPlayerPaused: true
                                })
                            }
                            opts={{
                                height: '100%',
                                width: '100%',
                                playerVars: {controls: 0, list: playerState.cuePlaylistId, listType: 'playlist'}
                            }}
                        />
                    </Box>
                    <Toolbar>
                        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                            <Grid item xs={4}>
                                <PlayerControlActions
                                    playerState={playerState}
                                    setPlayerState={setPlayerState}
                                    youtubePlayerState={youtubePlayerState}
                                />
                            </Grid>
                            <Grid item className="item-infos" xs={4}>
                                <PlayerContentInfos playerVideoId={playerState.videoId} />
                                <SeekBar playerState={playerState} />
                            </Grid>
                            <Grid item xs={4} textAlign={'end'} width={'100%'}>
                                <PlayerOtherActions
                                    playerState={playerState}
                                    isIFrameToggled={isIFrameToggled}
                                    setIsIFrameToggled={setIsIFrameToggled}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </div>
            )}
        </div>
    );
};

export default BottomPlayer;
