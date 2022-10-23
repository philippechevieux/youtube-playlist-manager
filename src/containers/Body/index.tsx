import {Route, Switch, useHistory} from 'react-router-dom';

import LoginScreen from '../../pages/LoginScreen/index';
import PlaylistContent from '../../pages/PlaylistContents/index';
import PlaylistList from '../../pages/Playlists/index';

import './styles.css';
import Profile from '../../pages/Profile';

import {useAppSelector} from '../../app/hooks';
import {selectIsUserLogin} from '../../utils/arms/user/selectors';

function Body() {
    let history = useHistory();

    const isUserLogin = useAppSelector(selectIsUserLogin);

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
                                <PlaylistContent />
                            </Route>
                        </Switch>
                    </>
                )}
            </div>
        </div>
    );
}

export default Body;
