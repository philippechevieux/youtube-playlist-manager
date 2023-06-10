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
import {muiTheme} from '../../utils/theme';

const App: React.FC = () => {
    const theme = React.useMemo(() => createTheme(muiTheme), []);

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
};

export default App;
