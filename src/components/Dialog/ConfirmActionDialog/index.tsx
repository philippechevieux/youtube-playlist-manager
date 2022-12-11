import {Dialog, DialogTitle, DialogActions, Button, DialogContent, Snackbar, AlertColor, Alert} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {useTranslation} from 'react-i18next';

function ConfirmActionDialog({
    visible = false,
    title,
    content,
    confirmButtonLabel,
    onConfirm,
    onCancel,
    snackbarVisible,
    snackbarSeverity,
    snackbarMessage,
    onCloseSnackBar
}: {
    visible: boolean;
    title?: string;
    content: string;
    confirmButtonLabel?: string;
    onConfirm: Function;
    onCancel: Function;
    snackbarVisible: boolean;
    snackbarSeverity: AlertColor | undefined;
    snackbarMessage: string;
    onCloseSnackBar: Function;
}) {
    const {t} = useTranslation();

    return (
        <>
            <Dialog open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">{title ? title : t('confirmation')}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={() => onCancel()}>{t('close')}</Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<SaveOutlinedIcon />}
                        onClick={() => onConfirm()}
                    >
                        {confirmButtonLabel ? confirmButtonLabel : t('confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarVisible}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                autoHideDuration={4000}
                onClose={() => onCloseSnackBar(false)}
            >
                <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </>
    );
}

export default ConfirmActionDialog;
