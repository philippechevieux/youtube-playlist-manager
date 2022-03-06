import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material'

// import './styles.css'
import { useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined'
import { UserDataContext } from './../../../utils/context/index'
import { DialogActionTypes } from '../../../utils/reducer'

function SelectPlaylistDialog() {
    const { dispatch, state } = useContext(UserDataContext)

    const [canSave, setCanSave] = useState(true)

    const onClose = () => {
        state.selectPlaylistDialogOnClose()

        dispatch({
            type: DialogActionTypes.HIDE_SELECT_PLAYLIST_DIALOG,
        })
    }

    const onSave = () => {
        state.selectPlaylistDialogOnClose()

        dispatch({
            type: DialogActionTypes.HIDE_SELECT_PLAYLIST_DIALOG,
        })
    }

    // TODO: Replace this function when i will use a real translation module
    const handleTranslationByMode = (content: string) => {
        let translation = ''

        if (state.selectPlaylistDialogMode === 'saveIn') {
            switch (content) {
                case 'dialogTitle':
                    translation = 'Enregistrer dans :'
                    break
                case 'dialogExecuteButton':
                    translation = 'Enregistrer'
                    break
            }
        } else if (state.selectPlaylistDialogMode === 'moveTo') {
            switch (content) {
                case 'dialogTitle':
                    translation = 'Déplacer vers :'
                    break
                case 'dialogExecuteButton':
                    translation = 'Déplacer'
                    break
            }
        }

        return translation
    }

    const displayExecuteButtonIcon = () => {
        if (state.selectPlaylistDialogMode === 'saveIn') {
            return <SaveOutlinedIcon />
        } else if (state.selectPlaylistDialogMode === 'moveTo') {
            return <SendAndArchiveOutlinedIcon />
        }
    }

    return (
        <Dialog open={state.isSelectPlaylistDialogOpen} fullWidth maxWidth="sm">
            <DialogTitle>{handleTranslationByMode('dialogTitle')}</DialogTitle>
            <DialogContent>blabla</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
                <Button
                    disabled={canSave}
                    variant="contained"
                    color="secondary"
                    startIcon={displayExecuteButtonIcon()}
                    onClick={onSave}
                >
                    {handleTranslationByMode('dialogExecuteButton')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SelectPlaylistDialog
