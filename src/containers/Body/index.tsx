import {Route, Switch, useHistory} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectIsUserLogin} from '../../utils/arms/user/selectors';
import {useEffect, useState} from 'react';
import LoginScreen from '../../pages/LoginScreen/index';
import PlaylistContent from '../../pages/PlaylistContents/index';
import PlaylistList from '../../pages/Playlists/index';
import Profile from '../../pages/Profile';
import BottomPlayer from '../../components/BottomPlayer';
import './styles.css';
import {playerStateInterface} from './types';

const defaultPlayerState: playerStateInterface = {
    player: null,
    videoId: '',
    videoIndex: undefined,
    shouldDisplayBottomBatar: false,
    isPlayerPaused: true,
    cuePlaylistId: ''
};

const Body: React.FC = () => {
    let history = useHistory();

    const isUserLogin = useAppSelector(selectIsUserLogin);

    const [playerState, setPlayerState] = useState<playerStateInterface>(defaultPlayerState);

    if (!isUserLogin) {
        history.push('/');
    }

    useEffect(() => {
        setPlayerState(defaultPlayerState);
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
                                <PlaylistContent playerState={playerState} setPlayerState={setPlayerState} />
                            </Route>
                        </Switch>
                    </>
                )}
            </div>
            {isUserLogin && <BottomPlayer playerState={playerState} setPlayerState={setPlayerState} />}
        </div>
    );
};

export default Body;
