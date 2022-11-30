import {Route, Switch, useHistory} from 'react-router-dom';

import LoginScreen from '../../pages/LoginScreen/index';
import PlaylistContent from '../../pages/PlaylistContents/index';
import PlaylistList from '../../pages/Playlists/index';

import './styles.css';
import Profile from '../../pages/Profile';

import {useAppSelector} from '../../app/hooks';
import {selectIsUserLogin} from '../../utils/arms/user/selectors';
import BottomPlayer from '../../components/BottomPlayer';
import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';

function Body() {
    let history = useHistory();

    const isUserLogin = useAppSelector(selectIsUserLogin);
    const [player, setPlayer] = useState<YouTubeEvent['target']>();
    const [playerVideoId, setPlayerVideoId] = useState('');
    const [playerVideoIndex, setPlayerVideoIndex] = useState<number | undefined>();
    const [displayBottomPlayer, setDisplayBottomPlayer] = useState(false);
    const [isPlayerPaused, setIsPlayerPaused] = useState(true);
    const [currentCuePlaylistId, setCurrentCuePlaylistId] = useState('');

    if (!isUserLogin) {
        history.push('/');
    }

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
            <BottomPlayer
                player={player}
                setPlayer={setPlayer}
                isPlayerPaused={isPlayerPaused}
                setIsPlayerPaused={setIsPlayerPaused}
                setPlayerVideoId={setPlayerVideoId}
                playlistId={currentCuePlaylistId}
                playerVideoIndex={playerVideoIndex}
                setPlayerVideoIndex={setPlayerVideoIndex}
                visible={displayBottomPlayer}
            />
        </div>
    );
}

export default Body;
