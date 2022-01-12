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
import { IPlaylistsItemData } from './../../../components/Playlist/interfaces'
import { useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import './styles.css'

function EditPlaylistDialog({
    open,
    setOpen,
    playlistData,
}: {
    open: boolean
    setOpen: Function
    playlistData?: IPlaylistsItemData
}) {
    const isPlaylistTitleEmpty = playlistData?.snippet.localized.title.length === 0
    const [title, setTitle] = useState(playlistData?.snippet.localized.title)
    const [description, setDescription] = useState(playlistData?.snippet.localized.description)
    const [status, setStatus] = useState(playlistData?.status.privacyStatus)
    const [titleError, setTitleError] = useState(isPlaylistTitleEmpty)

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
        setTitleError(event.target.value.length === 0)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    const onClose = () => {
        setOpen(false)
        setTitle(playlistData?.snippet.localized.title)
        setDescription(playlistData?.snippet.localized.description)
        setStatus(playlistData?.status.privacyStatus)
    }

    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
                Editer la playlist : {playlistData?.snippet.localized.title}
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
                <Button variant="contained" color="secondary" startIcon={<SaveOutlinedIcon />} onClick={onClose}>
                    Sauvegarder
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPlaylistDialog
