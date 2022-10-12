import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function ConfirmActionDialog({
    visible = false,
    title,
    content,
    confirmButtonLabel,
    onConfirm,
    onCancel
}: {
    visible: boolean;
    title?: string;
    content: string;
    confirmButtonLabel?: string;
    onConfirm: Function;
    onCancel: Function;
}) {
    return (
        <Dialog open={visible} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">{title ? title : 'Confirmation'}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>Fermer</Button>
                <Button variant="contained" color="error" startIcon={<SaveOutlinedIcon />} onClick={() => onConfirm()}>
                    {confirmButtonLabel ? confirmButtonLabel : 'Confirmer'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmActionDialog;
