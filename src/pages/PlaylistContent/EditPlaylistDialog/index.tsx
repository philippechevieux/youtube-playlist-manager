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
import { useEffect, useState, useContext } from 'react'
import { UserDataContext } from '../../../utils/context/userData/index'
import { updatePlaylistData } from '../../../utils/api'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import './styles.css'
import { IApiUpdatePlaylistParams } from '../../../utils/api/interface'

function EditPlaylistDialog({
    playlistId,
    open,
    setOpen,
    playlistData,
}: {
    playlistId: string
    open: boolean
    setOpen: Function
    playlistData?: IPlaylistsItemData
}) {
    const { state } = useContext(UserDataContext)

    const isPlaylistTitleEmpty = playlistData?.snippet.localized.title.length === 0
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [titleError, setTitleError] = useState(isPlaylistTitleEmpty)
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
        setOpen(false)
    }

    const onSave = () => {
        setOpen(false)

        // TODO: A déplacer dans playlistContent pour mettre à jour le titre après l'update et afficher un message alert ok ou ko
        const data: IApiUpdatePlaylistParams = {
            title: title,
            description: description,
            privacyStatus: status,
        }

        updatePlaylistData(state.accessToken, playlistId, data).then((data) => {
            console.log('data', data)
        })
    }

    useEffect(() => {
        if (playlistData !== undefined) {
            setTitle(playlistData?.snippet.localized.title)
            setDescription(playlistData?.snippet.localized.description)
            setStatus(playlistData?.status.privacyStatus)
            setCanSave(playlistData?.snippet.localized.title.length === 0)
        } else {
            setCanSave(false)
        }
    }, [open, playlistData])

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
