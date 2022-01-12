import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import { IPlaylistsItemData } from './../../../components/Playlist/interfaces'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

function EditPlaylistDialog({
    open,
    setOpen,
    playlistData,
}: {
    open: boolean
    setOpen: Function
    playlistData?: IPlaylistsItemData
}) {
    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">
                Editer la playlist : {playlistData?.snippet.localized.title}
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Fermer</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<SaveOutlinedIcon />}
                    onClick={() => setOpen(false)}
                >
                    Sauvegarder
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPlaylistDialog
