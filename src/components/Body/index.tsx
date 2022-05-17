import { Route, Switch } from 'react-router-dom'

import LoginScreen from '../../pages/LoginScreen/index'
import PlaylistContent from '../../pages/PlaylistContent/index'
import PlaylistList from '../../pages/PlaylistList/index'

import './styles.css'
import { Alert, Snackbar } from '@mui/material'
import ConfirmActionDialog from '../Dialog/ConfirmActionDialog'
import EditPlaylistDialog from '../Dialog/EditPlaylistDialog'
import SelectPlaylistDialog from './../Dialog/SelectPlaylistDialog/index'
import Profile from '../../pages/Profile'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsUserLogin } from '../../utils/arms/user/selectors'
import { hideSnackbar } from '../../utils/arms/global/reducer'
import {
    selectIsSnackbarDisplayed,
    selectSnackbarContent,
    selectSnackbarSeverity,
} from '../../utils/arms/global/selectors'

function Body() {
    const dispatch = useAppDispatch()

    const isUserLogin = useAppSelector(selectIsUserLogin)
    const isSnackbarDisplayed = useAppSelector(selectIsSnackbarDisplayed)
    const snackbarSeverity = useAppSelector(selectSnackbarSeverity)
    const snackbarContent = useAppSelector(selectSnackbarContent)

    const displayAlertFromSnackbar = () => {
        if (snackbarSeverity === 'success') {
            return <Alert severity="success">{snackbarContent}</Alert>
        } else if (snackbarSeverity === 'error') {
            return <Alert severity="error">{snackbarContent}</Alert>
        }
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
                open={isSnackbarDisplayed}
                autoHideDuration={5000}
                onClose={() => {
                    dispatch(hideSnackbar())
                }}
            >
                {displayAlertFromSnackbar()}
            </Snackbar>
        </div>
    )
}

export default Body
