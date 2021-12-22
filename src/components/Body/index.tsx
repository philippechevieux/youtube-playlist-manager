import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { GoogleAccountDataContext } from '../../utils/context'

import WaitingLoadingScreen from '../WaitingLoadingScreen/index'
import PlaylistContent from '../../pages/PlaylistContent/index'
import PlaylistList from '../../pages/PlaylistList/index'

import './styles.css'

function Body() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)

    return (
        <div>
            <div className="body-spacer"></div>
            <div className="body-container">
                {!googleAccountData.isUserLogin ? (
                    <WaitingLoadingScreen />
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
