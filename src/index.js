import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './utils/translations/i18n';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
