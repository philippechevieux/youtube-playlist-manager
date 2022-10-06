import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import './styles.css';
import store from '../../app/store';
import React from 'react';
import Header from '../Header';
import Body from '../Body';

function App() {
    //TODO: Ajouter un bouton pour changer de theme (https://mui.com/customization/dark-mode/)
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark',
                    primary: {
                        main: '#fff'
                    },
                    secondary: {
                        light: '#6ec6ff',
                        main: '#2196f3',
                        dark: '#0069c0',
                        contrastText: '#fff'
                    }
                },
                typography: {
                    fontFamily: 'Poppins, sans-serif'
                }
            }),
        []
    );

    return (
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
    );
}

export default App;
