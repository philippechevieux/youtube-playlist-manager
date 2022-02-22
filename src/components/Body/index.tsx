import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserDataContext } from '../../utils/context/userData'

import LoginScreen from '../../pages/LoginScreen/index'
import PlaylistContent from '../../pages/PlaylistContent/index'
import PlaylistList from '../../pages/PlaylistList/index'

import './styles.css'
import { Snackbar, Alert } from '@mui/material'
import { UserDataActionTypes } from '../../utils/reducer/userData'

function Body() {
    const { dispatch, state } = useContext(UserDataContext)

    return (
        <div>
            <div className="body-spacer"></div>
            <div className="body-container">
                {!state.isUserLogin ? (
                    <LoginScreen />
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <PlaylistList />
                        </Route>
                        <Route exact path="/playlist/:playlistId">
                            <PlaylistContent />
                        </Route>
                    </Switch>
                )}
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={state.isSnackbarDisplayed}
                autoHideDuration={5000}
                onClose={() => {
                    dispatch({
                        type: UserDataActionTypes.ERROR_FROM_API,
                        isSnackbarDisplayed: false,
                        snackbarSeverity: '',
                        snackbarContent: '',
                    })
                }}
            >
                {state.snackbarSeverity === 'success' ? (
                    <Alert severity="success">{state.snackbarContent}</Alert>
                ) : (
                    <Alert severity="error">{state.snackbarContent}</Alert>
                )}
            </Snackbar>
        </div>
    )
}

export default Body
