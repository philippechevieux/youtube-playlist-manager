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

    const displayAlertFromSnackbar = () => {
        if (state.snackbarSeverity === 'success') {
            return <Alert severity="success">{state.snackbarContent}</Alert>
        } else if (state.snackbarSeverity === 'error') {
            return <Alert severity="error">{state.snackbarContent}</Alert>
        }
    }

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
                        type: UserDataActionTypes.HIDE_SNACK_BAR,
                    })
                }}
            >
                {displayAlertFromSnackbar()}
            </Snackbar>
        </div>
    )
}

export default Body
