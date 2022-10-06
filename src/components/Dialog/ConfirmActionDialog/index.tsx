import {Dialog, DialogTitle, DialogActions, Button, DialogContent, Snackbar, Alert} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function ConfirmActionDialog({
    visible = false,
    title,
    content,
    confirmButtonLabel,
    onConfirm,
    onCancel,
    snackbarVisible = false,
    snackbarMessage,
    snackbarOnClose
}: {
    visible: boolean;
    title?: string;
    content: string;
    confirmButtonLabel?: string;
    onConfirm: Function;
    onCancel: Function;
    snackbarVisible?: boolean;
    snackbarMessage?: string;
    snackbarOnClose?: Function;
}) {
    return (
        <>
            <Dialog open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">{title ? title : 'Confirmation'}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={() => onCancel()}>Fermer</Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<SaveOutlinedIcon />}
                        onClick={() => onConfirm()}
                    >
                        {confirmButtonLabel ? confirmButtonLabel : 'Confirmer'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarVisible}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                autoHideDuration={4000}
                onClose={() => snackbarOnClose && snackbarOnClose()}
            >
                {/* TODO: regareder pour gérer les erreurs */}
                <Alert severity="success">{snackbarMessage}</Alert>
            </Snackbar>
        </>
    );
}

export default ConfirmActionDialog;
