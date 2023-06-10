import {LockOutlined, PublicOutlined, SaveOutlined, VisibilityOffOutlined} from '@material-ui/icons';
import {LoadingButton} from '@mui/lab';
import {
    Alert,
    AlertColor,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemText,
    MenuItem,
    Snackbar,
    TextField
} from '@mui/material';
import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {privacyStatusEnum} from '../../../utils/arms/playlists/state';
import './styles.css';
import {crudPlaylistMode} from './enums';

interface CrudPlaylistDialogProps {
    visible: boolean;
    mode: crudPlaylistMode;
    playlistTitle?: string;
    playlistDescription?: string;
    playlistStatus?: string;
    onCrud: Function;
    onCancel: Function;
    snackbarVisible: boolean;
    snackbarSeverity: AlertColor | undefined;
    snackbarMessage: string;
    onCloseSnackBar: Function;
}

const CrudPlaylistDialog: React.FC<CrudPlaylistDialogProps> = ({
    visible = false,
    mode,
    playlistTitle = '',
    playlistDescription = '',
    playlistStatus = privacyStatusEnum.PUBLIC,
    onCrud,
    onCancel,
    snackbarVisible,
    snackbarSeverity,
    snackbarMessage,
    onCloseSnackBar
}) => {
    const [title, setTitle] = useState(playlistTitle);
    const [description, setDescription] = useState(playlistDescription);
    const [status, setStatus] = useState(playlistStatus);
    const [titleError, setTitleError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const {t} = useTranslation();

    const getDialogTitle = () => {
        let dialogTitle = '';

        switch (mode) {
            case crudPlaylistMode.CREATE:
                dialogTitle = t('create playlist');
                break;
            case crudPlaylistMode.UPDATE:
                dialogTitle = t('edit playlist');
                break;
        }

        return dialogTitle;
    };

    const getCrudButtonText = () => {
        let crudButtonText = '';

        switch (mode) {
            case crudPlaylistMode.CREATE:
                crudButtonText = t('create');
                break;
            case crudPlaylistMode.UPDATE:
                crudButtonText = t('save');
                break;
        }

        return crudButtonText;
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setTitleError(event.target.value.length === 0);
        setCanSave(event.target.value.length === 0);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    const executeOnCancel = () => {
        setCanSave(true);
        setIsSaving(false);
        onCancel();
    };

    const executeOnCrud = () => {
        setIsSaving(true);
        onCrud(title, description, status);
    };

    useEffect(() => {
        setTitle(playlistTitle);
        setDescription(playlistDescription);
        setStatus(playlistStatus);
        setTitleError(playlistTitle.length === 0);
        setCanSave(playlistTitle.length === 0);
        setIsSaving(false);
    }, [playlistTitle, playlistDescription, playlistStatus, visible]);

    return (
        <>
            <Dialog className="crud-playlist" open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">{getDialogTitle()}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={titleError}
                        required
                        id="playlist-title"
                        margin="normal"
                        color="primary"
                        label={t('title')}
                        value={title}
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="playlist-description"
                        color="primary"
                        label={t('description')}
                        value={description}
                        type="text"
                        fullWidth
                        onChange={handleDescriptionChange}
                        variant="outlined"
                    />
                    <TextField
                        select
                        margin="normal"
                        id="playlist-select-status"
                        color="primary"
                        label={t('status')}
                        value={status}
                        fullWidth
                        onChange={handleStatusChange}
                        variant="outlined"
                    >
                        <MenuItem key={privacyStatusEnum.PUBLIC} value={privacyStatusEnum.PUBLIC}>
                            <PublicOutlined />
                            <ListItemText className="select-item-text" primary={t('public')} />
                        </MenuItem>
                        <MenuItem key={privacyStatusEnum.UNLISTED} value={privacyStatusEnum.UNLISTED}>
                            <VisibilityOffOutlined />
                            <ListItemText className="select-item-text" primary={t('not listed')} />
                        </MenuItem>
                        <MenuItem key={privacyStatusEnum.PRIVATE} value={privacyStatusEnum.PRIVATE}>
                            <LockOutlined />
                            <ListItemText className="select-item-text" primary={t('private')} />
                        </MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => executeOnCancel()}>{t('close')}</Button>
                    <LoadingButton
                        loading={isSaving}
                        disabled={canSave}
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveOutlined />}
                        onClick={() => executeOnCrud()}
                    >
                        {getCrudButtonText()}
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

export default CrudPlaylistDialog;
