import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserDataContext } from '../../utils/context/userData'

import LoginScreen from '../LoginScreen/index'
import PlaylistContent from '../../pages/PlaylistContent/index'
import PlaylistList from '../../pages/PlaylistList/index'

import './styles.css'

function Body() {
    const { state } = useContext(UserDataContext)

    return (
        <div>
            <div className="body-spacer"></div>
            <div className="body-container">
                {!state.isUserLogin ? (
                    <LoginScreen />
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <PlaylistList />
                        </Route>
                        <Route exact path="/playlist/:playlistId">
                            <PlaylistContent />
                        </Route>
                    </Switch>
                )}
            </div>
        </div>
    )
}

export default Body
