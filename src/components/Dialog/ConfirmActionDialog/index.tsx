import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {useTranslation} from 'react-i18next';

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
    const {t} = useTranslation();

    return (
        <Dialog open={visible} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">{title ? title : t('confirmation')}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>{t('close')}</Button>
                <Button variant="contained" color="error" startIcon={<SaveOutlinedIcon />} onClick={() => onConfirm()}>
                    {confirmButtonLabel ? confirmButtonLabel : t('confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmActionDialog;
