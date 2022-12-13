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
import Footer from '../Footer';

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
                        main: '#ff4b31',
                        dark: '#b33321',
                        contrastText: '#fff'
                    }
                },
                typography: {
                    fontFamily: 'Poppins, sans-serif',
                    h1: {
                        fontSize: '2rem',
                        textTransform: 'uppercase',
                        maxWidth: 'fit-content',
                        color: '#fff',
                        backgroundImage: 'linear-gradient(90deg, #ffeaea  0%, #ff4b31 100%)',
                        backgroundClip: 'text',
                        '-webkitBackgroundClip': 'text',
                        '-webkitTextFillColor': '#00000000',
                        fontWeight: '500'
                    },
                    h2: {
                        fontSize: '1.5rem',
                        textTransform: 'uppercase',
                        maxWidth: 'fit-content',
                        color: '#fff',
                        backgroundImage: 'linear-gradient(90deg, #ffeaea  0%, #ff4b31 100%)',
                        backgroundClip: 'text',
                        '-webkitBackgroundClip': 'text',
                        '-webkitTextFillColor': '#00000000',
                        fontWeight: '500'
                    },
                    h3: {
                        fontSize: '1.5rem',
                        fontWeight: '500'
                    },
                    h6: {
                        fontSize: '1.25rem',
                        fontWeight: '500'
                    },
                    body1: {
                        fontSize: '1rem',
                        fontWeight: 'initial'
                    },
                    body2: {
                        fontSize: '0.875rem',
                        fontWeight: '400'
                    },
                    subtitle1: {
                        fontSize: '1rem',
                        fontWeight: '400'
                    },
                    subtitle2: {
                        fontSize: '0.875rem',
                        fontWeight: '400'
                    }
                },
                components: {
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                backgroundColor: '#00000021',
                                border: '1px solid #5656562e'
                            }
                        }
                    }
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
                            <Footer />
                        </div>
                    </Provider>
                </Router>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
