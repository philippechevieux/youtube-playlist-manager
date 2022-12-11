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

export enum crudPlaylistMode {
    CREATE = 'create',
    UPDATE = 'update'
}

function CrudPlaylistDialog({
    visible = false,
    mode,
    playlistTitle = '',
    playlistDescription = '',
    playlistStatus = '',
    setPlaylistTitle,
    setPlaylistDescription,
    setPlaylistStatus,
    titleError,
    canSave,
    isSaving,
    setTitleError,
    setCanSave,
    setIsSaving,
    onCrud,
    onCancel,
    snackbarVisible,
    snackbarSeverity,
    snackbarMessage,
    onCloseSnackBar
}: {
    visible: boolean;
    mode: crudPlaylistMode;
    playlistTitle: string;
    playlistDescription: string;
    playlistStatus: string;
    setPlaylistTitle: Function;
    setPlaylistDescription: Function;
    setPlaylistStatus: Function;
    titleError: boolean;
    canSave: boolean;
    isSaving: boolean;
    setTitleError: Function;
    setCanSave: Function;
    setIsSaving: Function;
    onCrud: Function;
    onCancel: Function;
    snackbarVisible: boolean;
    snackbarSeverity: AlertColor | undefined;
    snackbarMessage: string;
    onCloseSnackBar: Function;
}) {
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
        setPlaylistTitle(event.target.value);
        setTitleError(event.target.value.length === 0);
        setCanSave(event.target.value.length === 0);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistDescription(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistStatus(event.target.value);
    };

    const executeOnCancel = () => {
        setCanSave(true);
        setIsSaving(false);
        onCancel();
    };

    const executeOnCrud = () => {
        setIsSaving(true);
        onCrud(playlistTitle, playlistDescription, playlistStatus);
    };

    return (
        <>
            <Dialog open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">{getDialogTitle()}</DialogTitle>
                <DialogContent>
                    <TextField
                        error={titleError}
                        required
                        id="edit-playlist-title"
                        margin="normal"
                        color="secondary"
                        label={t('title')}
                        value={playlistTitle}
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="edit-playlist-description"
                        color="secondary"
                        label={t('description')}
                        value={playlistDescription}
                        type="text"
                        fullWidth
                        onChange={handleDescriptionChange}
                        variant="outlined"
                    />
                    <TextField
                        select
                        margin="normal"
                        id="edit-playlist-select-status"
                        color="secondary"
                        label={t('status')}
                        value={playlistStatus}
                        fullWidth
                        onChange={handleStatusChange}
                        variant="outlined"
                    >
                        <MenuItem key="public" value="public">
                            <PublicOutlined />
                            <ListItemText className="select-item-text" primary={t('public')} />
                        </MenuItem>
                        <MenuItem key="unlisted" value="unlisted">
                            <VisibilityOffOutlined />
                            <ListItemText className="select-item-text" primary={t('not listed')} />
                        </MenuItem>
                        <MenuItem key="private" value="private">
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
}

export default CrudPlaylistDialog;
