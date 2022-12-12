import {Route, Switch, useHistory} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectIsUserLogin} from '../../utils/arms/user/selectors';
import {useEffect, useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import LoginScreen from '../../pages/LoginScreen/index';
import PlaylistContent from '../../pages/PlaylistContents/index';
import PlaylistList from '../../pages/Playlists/index';
import Profile from '../../pages/Profile';
import BottomPlayer from '../../components/BottomPlayer';
import './styles.css';

const defaultPlayer = undefined;
const defaultPlayerVideoId = '';
const defaultPlayerVideoIndex = undefined;
const defaultDisplayBottomPlayer = false;
const defaultIsPlayerPaused = true;
const defaultCurrentCuePlaylistId = '';

function Body() {
    let history = useHistory();

    const isUserLogin = useAppSelector(selectIsUserLogin);
    const [player, setPlayer] = useState<YouTubeEvent['target']>();
    const [playerVideoId, setPlayerVideoId] = useState(defaultPlayerVideoId);
    const [playerVideoIndex, setPlayerVideoIndex] = useState<number | undefined>(defaultPlayerVideoIndex);
    const [displayBottomPlayer, setDisplayBottomPlayer] = useState(defaultDisplayBottomPlayer);
    const [isPlayerPaused, setIsPlayerPaused] = useState(defaultIsPlayerPaused);
    const [currentCuePlaylistId, setCurrentCuePlaylistId] = useState(defaultCurrentCuePlaylistId);

    if (!isUserLogin) {
        history.push('/');
    }

    useEffect(() => {
        setPlayer(defaultPlayer);
        setPlayerVideoId(defaultPlayerVideoId);
        setPlayerVideoIndex(defaultPlayerVideoIndex);
        setDisplayBottomPlayer(defaultDisplayBottomPlayer);
        setIsPlayerPaused(defaultIsPlayerPaused);
        setCurrentCuePlaylistId(defaultCurrentCuePlaylistId);
    }, [isUserLogin]);

    return (
        <div>
            <div className="body-spacer"></div>
            <div className="body-container">
                {!isUserLogin ? (
                    <LoginScreen />
                ) : (
                    <>
                        <Switch>
                            <Route exact path="/playlists">
                                <PlaylistList />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            <Route exact path="/playlist/:playlistId">
                                <PlaylistContent
                                    player={player}
                                    isPlayerPaused={isPlayerPaused}
                                    playerVideoId={playerVideoId}
                                    playerVideoIndex={playerVideoIndex}
                                    setPlayerVideoIndex={setPlayerVideoIndex}
                                    setDisplayBottomPlayer={setDisplayBottomPlayer}
                                    currentCuePlaylistId={currentCuePlaylistId}
                                    setCurrentCuePlaylistId={setCurrentCuePlaylistId}
                                />
                            </Route>
                        </Switch>
                    </>
                )}
            </div>
            {isUserLogin && (
                <BottomPlayer
                    player={player}
                    setPlayer={setPlayer}
                    isPlayerPaused={isPlayerPaused}
                    setIsPlayerPaused={setIsPlayerPaused}
                    playerVideoId={playerVideoId}
                    setPlayerVideoId={setPlayerVideoId}
                    playlistId={currentCuePlaylistId}
                    playerVideoIndex={playerVideoIndex}
                    setPlayerVideoIndex={setPlayerVideoIndex}
                    visible={displayBottomPlayer}
                />
            )}
        </div>
    );
}

export default Body;
