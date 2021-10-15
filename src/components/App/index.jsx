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
    // TODO: mettre un cookie ou localstorage pour ne pas perdre les infos a chaque refresh de la page
    // TODO: peut être utiliser un useContext pour googleAccountData ?
    const [googleAccountData, setGoogleAccountData] = useState(null)

    console.log('App : ', googleAccountData)

    return (
        <Router>
            <GlobalStyle />
            <Header googleAccountData={googleAccountData} setGoogleAccountData={setGoogleAccountData} />
            <BodyContent>
                {!googleAccountData ? (
                    <WaitingLoadingScreen />
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <PlaylistList googleAccountData={googleAccountData} />
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
