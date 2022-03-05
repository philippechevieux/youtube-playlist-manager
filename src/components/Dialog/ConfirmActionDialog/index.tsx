import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useContext } from 'react'
import { UserDataContext } from '../../../utils/context'
import { DialogActionTypes } from '../../../utils/reducer'

function ConfirmActionDialog() {
    const { dispatch, state } = useContext(UserDataContext)

    const onClickClose = () => {
        dispatch({
            type: DialogActionTypes.HIDE_CONFIRM_ACTION_DIALOG,
        })
    }

    const onClickExecute = () => {
        let functionToExecute = state.confirmActionDialogOnExecute
        functionToExecute()

        dispatch({
            type: DialogActionTypes.HIDE_CONFIRM_ACTION_DIALOG,
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
