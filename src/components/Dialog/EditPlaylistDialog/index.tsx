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
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserAccessToken } from '../../../utils/arms/user/selectors'
import { useEffect, useState } from 'react'
import { updatePlaylistData } from '../../../utils/api'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import './styles.css'
import { IApiUpdatePlaylistParams } from '../../../utils/api/interface'
import { displaySnackbar, hideEditPlaylistDialog } from '../../../utils/arms/global/reducer'
import {
    selectEditPlaylistDialogData,
    selectEditPlaylistDialogId,
    selectEditPlaylistDialogOnClose,
    selectIsEditPlaylistDialogOpen,
} from '../../../utils/arms/global/selectors'

function EditPlaylistDialog() {
    const dispatch = useAppDispatch()
    const userAccessToken = useAppSelector(selectUserAccessToken)
    const isEditPlaylistDialogOpen = useAppSelector(selectIsEditPlaylistDialogOpen)
    const editPlaylistDialogId = useAppSelector(selectEditPlaylistDialogId)
    const editPlaylistDialogOnClose = useAppSelector(selectEditPlaylistDialogOnClose)
    const editPlaylistDialogData = useAppSelector(selectEditPlaylistDialogData)

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
        dispatch(hideEditPlaylistDialog())
    }

    const onSave = () => {
        dispatch(hideEditPlaylistDialog())

        const dataToSave: IApiUpdatePlaylistParams = {
            title: title,
            description: description,
            privacyStatus: status,
        }

        updatePlaylistData(userAccessToken, editPlaylistDialogId, dataToSave).then((updatedData) => {
            editPlaylistDialogOnClose(updatedData)

            dispatch(
                displaySnackbar({
                    snackbarSeverity: 'success',
                    snackbarContent: 'Les informations de votre playlist ont été modifiés avec succès',
                })
            )
        })
    }

    useEffect(() => {
        setTitle(editPlaylistDialogData.snippet.localized.title)
        setTitleError(editPlaylistDialogData.snippet.localized.title.length === 0)
        setDescription(editPlaylistDialogData.snippet.localized.description)
        setStatus(editPlaylistDialogData.status.privacyStatus)
        setCanSave(editPlaylistDialogData.snippet.localized.title.length === 0)
    }, [editPlaylistDialogData])

    return (
        <Dialog open={isEditPlaylistDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                Editer la playlist : {editPlaylistDialogData.snippet.localized.title}
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={titleError && isEditPlaylistDialogOpen}
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
                    disabled={canSave && isEditPlaylistDialogOpen}
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
