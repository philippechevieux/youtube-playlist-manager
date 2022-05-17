import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserDataContext } from '../../utils/context'

import LoginScreen from '../../pages/LoginScreen/index'
import PlaylistContent from '../../pages/PlaylistContent/index'
import PlaylistList from '../../pages/PlaylistList/index'

import './styles.css'
import { Snackbar, Alert } from '@mui/material'
import { DialogActionTypes } from '../../utils/reducer'
import ConfirmActionDialog from '../Dialog/ConfirmActionDialog'
import EditPlaylistDialog from '../Dialog/EditPlaylistDialog'
import SelectPlaylistDialog from './../Dialog/SelectPlaylistDialog/index'
import Profile from '../../pages/Profile'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsUserLogin } from '../../utils/arms/user/selectors'

function Body() {
    // const { dispatch, state } = useContext(UserDataContext)
    const isUserLogin = useAppSelector(selectIsUserLogin)

    const displayAlertFromSnackbar = () => {
        // if (state.snackbarSeverity === 'success') {
        //     return <Alert severity="success">{state.snackbarContent}</Alert>
        // } else if (state.snackbarSeverity === 'error') {
        //     return <Alert severity="error">{state.snackbarContent}</Alert>
        // }

        return <p></p>
    }

    return (
        <div>
            <div className="body-spacer"></div>
            <div className="body-container">
                {!isUserLogin ? (
                    <LoginScreen />
                ) : (
                    <>
                        <Switch>
                            <Route exact path="/">
                                <PlaylistList />
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            <Route exact path="/playlist/:playlistId">
                                <PlaylistContent />
                            </Route>
                        </Switch>
                        <ConfirmActionDialog />
                        <SelectPlaylistDialog />
                        <EditPlaylistDialog />
                    </>
                )}
            </div>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // open={state.isSnackbarDisplayed}
                autoHideDuration={5000}
                onClose={() => {
                    // dispatch({
                    //     type: DialogActionTypes.HIDE_SNACK_BAR,
                    // })
                }}
            >
                {displayAlertFromSnackbar()}
            </Snackbar>
        </div>
    )
}

export default Body
