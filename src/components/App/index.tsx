import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataProvider } from '../../utils/context'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import './styles.css'
import React from 'react'
import Header from '../Header'
import Body from '../Body'

function App() {
    //TODO: Ajouter un bouton pour changer de theme (https://mui.com/customization/dark-mode/)
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark',
                    primary: {
                        main: '#fff',
                    },
                    secondary: {
                        light: '#6ec6ff',
                        main: '#2196f3',
                        dark: '#0069c0',
                        contrastText: '#fff',
                    },
                },
                typography: {
                    fontFamily: 'Poppins, sans-serif',
                },
            }),
        []
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <UserDataProvider>
                    <div className="app-container">
                        <Header />
                        <Body />
                    </div>
                </UserDataProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App
