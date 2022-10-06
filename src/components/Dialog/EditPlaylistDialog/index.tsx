import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
    MenuItem,
    ListItemText,
    Snackbar,
    Alert
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {useEffect, useState} from 'react';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import './styles.css';
import {selectPlaylistItem} from '../../../utils/arms/playlists/selectors';
import {IApiUpdatePlaylistParams} from '../../../utils/api/interface';
import {updatePlaylistData} from '../../../utils/api';
import {updatePlaylist} from '../../../utils/arms/playlists/reducer';

function EditPlaylistDialog({
    visible = false,
    playlistId,
    onCancel
}: {
    visible: boolean;
    playlistId: string | undefined;
    onCancel: Function;
}) {
    const dispatch = useAppDispatch();
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const playlistItem = useAppSelector(state => selectPlaylistItem(state, playlistId));

    const [title, setTitle] = useState(playlistItem.snippet.localized.title);
    const [description, setDescription] = useState(playlistItem.snippet.localized.description);
    const [status, setStatus] = useState(playlistItem.status.privacyStatus);
    const [titleError, setTitleError] = useState(false);
    const [canSave, setCanSave] = useState(true);
    const [displaySnackbar, setDisplaySnackbar] = useState(false);

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

    const onSave = () => {
        if (playlistId !== undefined) {
            const dataToSave: IApiUpdatePlaylistParams = {
                title: title,
                description: description,
                privacyStatus: status
            };

            updatePlaylistData(userAccessToken, playlistId, dataToSave).then(updatedData => {
                setDisplaySnackbar(true);
                dispatch(updatePlaylist({playlistId: playlistId, dataToUpdate: dataToSave}));
                onCancel();
            });
        }
    };

    useEffect(() => {
        setTitle(playlistItem.snippet.localized.title);
        setTitleError(playlistItem.snippet.localized.title.length === 0);
        setDescription(playlistItem.snippet.localized.description);
        setStatus(playlistItem.status.privacyStatus);
        setCanSave(playlistItem.snippet.localized.title.length === 0);
    }, [playlistItem, visible]);

    return (
        <>
            <Dialog open={visible} fullWidth maxWidth="sm">
                <DialogTitle id="alert-dialog-title">
                    Editer la playlist : {playlistItem.snippet.localized.title}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        error={titleError}
                        required
                        id="edit-playlist-title"
                        margin="normal"
                        color="secondary"
                        label="Titre"
                        value={title}
                        type="text"
                        fullWidth
                        onChange={handleTitleChange}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="edit-playlist-description"
                        color="secondary"
                        label="Description"
                        value={description}
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
                        label="Status"
                        value={status}
                        fullWidth
                        onChange={handleStatusChange}
                        variant="outlined"
                    >
                        <MenuItem key="public" value="public">
                            <PublicOutlinedIcon />
                            <ListItemText className="select-item-text" primary={'Public'} />
                        </MenuItem>
                        <MenuItem key="unlisted" value="unlisted">
                            <VisibilityOffOutlinedIcon />
                            <ListItemText className="select-item-text" primary={'Non répertoriée'} />
                        </MenuItem>
                        <MenuItem key="private" value="private">
                            <LockOutlinedIcon />
                            <ListItemText className="select-item-text" primary={'Privée'} />
                        </MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onCancel()}>Fermer</Button>
                    <Button
                        disabled={canSave}
                        variant="contained"
                        color="secondary"
                        startIcon={<SaveOutlinedIcon />}
                        onClick={onSave}
                    >
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={displaySnackbar}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                autoHideDuration={4000}
                onClose={() => setDisplaySnackbar(false)}
            >
                <Alert severity="success">Les informations de votre playlist ont été modifiés avec succès</Alert>
            </Snackbar>
        </>
    );
}

export default EditPlaylistDialog;
