import { RootState } from '../../../app/store'

export const selectIsConfirmActionDialogOpen = (state: RootState) => {
    return state.global.isConfirmActionDialogOpen
}

export const selectConfirmActionDialogContentMessage = (state: RootState) => {
    return state.global.confirmActionDialogContentMessage
}

export const selectConfirmActionDialogExecuteButtonLabel = (state: RootState) => {
    return state.global.confirmActionDialogExecuteButtonLabel
}

export const selectConfirmActionDialogOnExecute = (state: RootState) => {
    return state.global.confirmActionDialogOnExecute
}

export const selectIsSelectPlaylistDialogOpen = (state: RootState) => {
    return state.global.isSelectPlaylistDialogOpen
}

export const selectSelectPlaylistDialogMode = (state: RootState) => {
    return state.global.selectPlaylistDialogMode
}

export const selectSelectPlaylistDialogOnClose = (state: RootState) => {
    return state.global.selectPlaylistDialogOnClose
}

export const selectSelectPlaylistDialogOnSave = (state: RootState) => {
    return state.global.selectPlaylistDialogOnSave
}

export const selectSelectPlaylistDialogCurrentPlaylistId = (state: RootState) => {
    return state.global.currentPlaylistId
}

export const selectSelectPlaylistDialogHideCurrentPlaylist = (state: RootState) => {
    return state.global.selectPlaylistDialogHideCurrentPlaylist
}

export const selectIsEditPlaylistDialogOpen = (state: RootState) => {
    return state.global.isEditPlaylistDialogOpen
}

export const selectEditPlaylistDialogId = (state: RootState) => {
    return state.global.editPlaylistDialogId
}

export const selectEditPlaylistDialogOnClose = (state: RootState) => {
    return state.global.editPlaylistDialogOnClose
}

export const selectEditPlaylistDialogData = (state: RootState) => {
    return state.global.editPlaylistDialogData
}

export const selectIsSnackbarDisplayed = (state: RootState) => {
    return state.global.isSnackbarDisplayed
}

export const selectSnackbarSeverity = (state: RootState) => {
    return state.global.snackbarSeverity
}

export const selectSnackbarContent = (state: RootState) => {
    return state.global.snackbarContent
}
