import { useContext } from 'react'
import { BrowserRouter as Route, Switch } from 'react-router-dom'
import { GoogleAccountDataContext } from '../../utils/context/'

import WaitingLoadingScreen from '../WaitingLoadingScreen/index'
import PlaylistContent from './../../pages/PlaylistContent/index'
import PlaylistList from './../../pages/PlaylistList/index'

function Body() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)

    return (
        <div>
            {!googleAccountData ? (
                <WaitingLoadingScreen />
            ) : (
                <Switch>
                    <Route exact path="/">
                        <PlaylistList />
                    </Route>
                    <Route exact path="/playlist/:playlistid">
                        <PlaylistContent />
                    </Route>
                </Switch>
            )}
        </div>
    )
}

export default Body
