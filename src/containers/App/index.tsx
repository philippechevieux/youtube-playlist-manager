import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {GoogleOAuthProvider} from '@react-oauth/google';

import './styles.css';
import store from '../../app/store';
import React from 'react';
import Header from '../Header';
import Body from '../../containers/Body';

function App() {
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark',
                    primary: {
                        main: '#fff'
                    },
                    secondary: {
                        light: '#eb6652',
                        main: '#eb6652',
                        dark: '#ff4b31',
                        contrastText: '#fff'
                    }
                },
                typography: {
                    fontFamily: 'Poppins, sans-serif'
                }
            }),
        []
    );

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : '';

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Provider store={store}>
                        <div className="app-container">
                            <Header />
                            <Body />
                        </div>
                    </Provider>
                </Router>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
