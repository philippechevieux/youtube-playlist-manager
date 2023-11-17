import {Dialog, DialogTitle, DialogActions, Button, DialogContent, Snackbar, AlertColor, Alert} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {LoadingButton} from '@mui/lab';
import {SaveOutlined} from '@material-ui/icons';

interface ConfirmActionDialogProps {
    visible: boolean;
    title?: string;
    content: string;
    confirmButtonLabel?: string;
    onConfirm: Function;
    onCancel: Function;
    isConfirming?: boolean;
    snackbarVisible: boolean;
    snackbarSeverity: AlertColor | undefined;
    snackbarMessage: string;
    onCloseSnackBar: Function;
}

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
    visible = false,
    title,
    content,
    confirmButtonLabel,
    onConfirm,
    onCancel,
    isConfirming = false,
    snackbarVisible,
    snackbarSeverity,
    snackbarMessage,
    onCloseSnackBar
}) => {
    const {t} = useTranslation();

    return (
        <>
            <Dialog open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">{title ? title : t('confirmation')}</DialogTitle>
                <DialogContent>{content}</DialogContent>
                <DialogActions>
                    <Button onClick={() => onCancel()}>{t('close')}</Button>
                    <LoadingButton
                        loading={isConfirming}
                        disabled={isConfirming}
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        onClick={() => onConfirm()}
                    >
                        {confirmButtonLabel ? confirmButtonLabel : t('confirm')}
                    </LoadingButton>
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
};

export default ConfirmActionDialog;
