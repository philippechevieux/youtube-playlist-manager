import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WaitingLoadingScreen from '../WaitingLoadingScreen/index'
import Header from '../Header'
import GlobalStyle from '../../utils/styles/GlobalStyles'
import styled from 'styled-components'
import PlaylistContent from './../../pages/PlaylistContent/index'
import PlaylistList from './../../pages/PlaylistList/index'

const BodyContent = styled.div`
    margin-top: 95px;
`

function App() {
    const [token, setToken] = useState(null)

    return (
        <Router>
            <GlobalStyle />
            <Header token={token} setToken={setToken} />
            <BodyContent>
                {!token ? (
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
            </BodyContent>
        </Router>
    )
}

export default App
