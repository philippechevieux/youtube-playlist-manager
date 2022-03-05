import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    TextField,
    MenuItem,
    ListItemText,
} from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { UserDataContext } from '../../../utils/context/index'
import { updatePlaylistData } from '../../../utils/api'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import './styles.css'
import { IApiUpdatePlaylistParams } from '../../../utils/api/interface'
import { DialogActionTypes } from '../../../utils/reducer'

function EditPlaylistDialog() {
    const { dispatch, state } = useContext(UserDataContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [canSave, setCanSave] = useState(true)

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        setTitleError(event.target.value.length === 0)
        setCanSave(event.target.value.length === 0)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    const onClose = () => {
        dispatch({
            type: DialogActionTypes.HIDE_EDIT_PLAYLIST_DIALOG,
        })
    }

    const onSave = () => {
        dispatch({
            type: DialogActionTypes.HIDE_EDIT_PLAYLIST_DIALOG,
        })

        const dataToSave: IApiUpdatePlaylistParams = {
            title: title,
            description: description,
            privacyStatus: status,
        }

        updatePlaylistData(state.accessToken, state.editPlaylistDialogPlaylistId, dataToSave).then((updatedData) => {
            state.editPlaylistDialogSetPlaylistData(updatedData)
            dispatch({
                type: DialogActionTypes.DISPLAY_SNACK_BAR,
                snackbarSeverity: 'success',
                snackbarContent: 'Les informations de votre playlist ont été modifiés avec succès',
            })
        })
    }

    useEffect(() => {
        setTitle(state.editPlaylistDialogPlaylistData.snippet.localized.title)
        setTitleError(state.editPlaylistDialogPlaylistData.snippet.localized.title.length === 0)
        setDescription(state.editPlaylistDialogPlaylistData.snippet.localized.description)
        setStatus(state.editPlaylistDialogPlaylistData.status.privacyStatus)
        setCanSave(state.editPlaylistDialogPlaylistData.snippet.localized.title.length === 0)
    }, [state.editPlaylistDialogPlaylistData])

    return (
        <Dialog open={state.isEditPlaylistDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                Editer la playlist : {state.editPlaylistDialogPlaylistData.snippet.localized.title}
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={titleError}
                    required
                    id="dsqds"
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
                    id="dd"
                    margin="normal"
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
                    id="edit-playlist-select-status"
                    margin="normal"
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
                <Button onClick={onClose}>Fermer</Button>
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
    )
}

export default EditPlaylistDialog
