import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { hideConfirmActionDialog } from '../../../utils/arms/global/reducer'
import {
    selectConfirmActionDialogContentMessage,
    selectConfirmActionDialogExecuteButtonLabel,
    selectConfirmActionDialogOnExecute,
    selectIsConfirmActionDialogOpen,
} from '../../../utils/arms/global/selectors'

function ConfirmActionDialog() {
    const dispatch = useAppDispatch()
    const confirmActionDialogOnExecute = useAppSelector(selectConfirmActionDialogOnExecute)
    const isConfirmActionDialogOpen = useAppSelector(selectIsConfirmActionDialogOpen)
    const confirmActionDialogContentMessage = useAppSelector(selectConfirmActionDialogContentMessage)
    const confirmActionDialogExecuteButtonLabel = useAppSelector(selectConfirmActionDialogExecuteButtonLabel)

    const onClickClose = () => {
        dispatch(hideConfirmActionDialog())
    }

    const onClickExecute = () => {
        let functionToExecute = confirmActionDialogOnExecute
        functionToExecute()

        dispatch(hideConfirmActionDialog())
    }

    return (
        <Dialog open={isConfirmActionDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
            <DialogContent>{confirmActionDialogContentMessage}</DialogContent>
            <DialogActions>
                <Button onClick={onClickClose}>Fermer</Button>
                <Button variant="contained" color="error" startIcon={<SaveOutlinedIcon />} onClick={onClickExecute}>
                    {confirmActionDialogExecuteButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmActionDialog
