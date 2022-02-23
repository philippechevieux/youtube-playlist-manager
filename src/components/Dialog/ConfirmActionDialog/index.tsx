import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useContext } from 'react'
import { UserDataContext } from '../../../utils/context/userData'
import { UserDataActionTypes } from '../../../utils/reducer/userData'

function ConfirmActionDialog() {
    const { dispatch, state } = useContext(UserDataContext)

    const onClickClose = () => {
        dispatch({
            type: UserDataActionTypes.HIDE_CONFIRM_ACTION_DIALOG,
        })
    }

    const onClickExecute = () => {
        let functionToExecute = state.confirmActionDialogOnExecute
        functionToExecute()

        dispatch({
            type: UserDataActionTypes.HIDE_CONFIRM_ACTION_DIALOG,
        })
    }

    return (
        <Dialog open={state.isConfirmActionDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>{state.confirmActionDialogContentMessage}</DialogContent>
            <DialogActions>
                <Button onClick={onClickClose}>Fermer</Button>
                <Button variant="contained" color="error" startIcon={<SaveOutlinedIcon />} onClick={onClickExecute}>
                    {state.confirmActionDialogExecuteButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmActionDialog
