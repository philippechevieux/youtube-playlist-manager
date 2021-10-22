import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleAccountDataProvider } from '../../utils/context/'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import React from 'react'
import Header from '../Header'
import Body from '../Body'
import GlobalStyle from '../../utils/styles/GlobalStyles'

function App() {
    //TODO: Ajouter un bouton pour changer de theme (https://mui.com/customization/dark-mode/)
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark',
                },
            }),
        []
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <GlobalStyle />
                <GoogleAccountDataProvider>
                    <Header />
                    <Body />
                </GoogleAccountDataProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
