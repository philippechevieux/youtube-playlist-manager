import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleAccountDataProvider } from '../../utils/context/'

import React from 'react'
import Header from '../Header'
import Body from '../Body'
import GlobalStyle from '../../utils/styles/GlobalStyles'

function App() {
    return (
        <Router>
            <GlobalStyle />
            <GoogleAccountDataProvider>
                <Header />
                <Body />
            </GoogleAccountDataProvider>
        </Router>
    )
}

export default App
