import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultPlaylistItemData, globalDefaultData, PlaylistsItemDataInterface } from './state'

export const globalSlice = createSlice({
    name: 'global',
    initialState: globalDefaultData,
    reducers: {
        displayEditPlaylistDialog: (
            state: any,
            action: PayloadAction<{
                editPlaylistDialogData: PlaylistsItemDataInterface
                editPlaylistDialogOnClose: Function
                editPlaylistDialogId: string
            }>
        ) => {
            state.isEditPlaylistDialogOpen = true
            state.editPlaylistDialogData = action.payload.editPlaylistDialogData
            state.editPlaylistDialogOnClose = action.payload.editPlaylistDialogOnClose
            state.editPlaylistDialogId = action.payload.editPlaylistDialogId
        },
        hideEditPlaylistDialog: (state: any) => {
            state.isEditPlaylistDialogOpen = false
            state.editPlaylistDialogData = DefaultPlaylistItemData
            state.editPlaylistDialogOnClose = () => {}
            state.editPlaylistDialogId = ''
        },
        displayConfirmActionDialog: (
            state: any,
            action: PayloadAction<{
                confirmActionDialogOnExecute: Function
                confirmActionDialogExecuteButtonLabel: string
                confirmActionDialogContentMessage: string
            }>
        ) => {
            state.isConfirmActionDialogOpen = true
            state.confirmActionDialogOnExecute = action.payload.confirmActionDialogOnExecute
            state.confirmActionDialogExecuteButtonLabel = action.payload.confirmActionDialogExecuteButtonLabel
            state.confirmActionDialogContentMessage = action.payload.confirmActionDialogContentMessage
        },
        hideConfirmActionDialog: (state: any) => {
            state.isConfirmActionDialogOpen = false
            state.confirmActionDialogOnExecute = () => {}
            state.confirmActionDialogExecuteButtonLabel = ''
            state.confirmActionDialogContentMessage = ''
        },
        displaySelectPlaylistDialog: (
            state: any,
            action: PayloadAction<{
                currentPlaylistId: string
                selectPlaylistDialogHideCurrentPlaylist: boolean
                selectPlaylistDialogMode: string
                selectPlaylistDialogOnClose: Function
                selectPlaylistDialogOnSave: Function
            }>
        ) => {
            state.isSelectPlaylistDialogOpen = true
            state.currentPlaylistId = action.payload.currentPlaylistId
            state.selectPlaylistDialogHideCurrentPlaylist = action.payload.selectPlaylistDialogHideCurrentPlaylist
            state.selectPlaylistDialogMode = action.payload.selectPlaylistDialogMode
            state.selectPlaylistDialogOnClose = action.payload.selectPlaylistDialogOnClose
            state.selectPlaylistDialogOnSave = action.payload.selectPlaylistDialogOnSave
        },
        hideSelectPlaylistDialog: (state: any) => {
            state.isSelectPlaylistDialogOpen = false
            state.currentPlaylistId = ''
            state.selectPlaylistDialogHideCurrentPlaylist = true
            state.selectPlaylistDialogMode = ''
            state.selectPlaylistDialogOnClose = () => {}
            state.selectPlaylistDialogOnSave = () => {}
        },
        displaySnackbar: (
            state: any,
            action: PayloadAction<{
                snackbarSeverity: string
                snackbarContent: string
            }>
        ) => {
            state.isSnackbarDisplayed = true
            state.snackbarSeverity = action.payload.snackbarSeverity
            state.snackbarContent = action.payload.snackbarContent
        },
        hideSnackbar: (state: any) => {
            state.isSnackbarDisplayed = false
            state.snackbarSeverity = ''
            state.snackbarContent = ''
        },
    },
})

export const {
    displayEditPlaylistDialog,
    hideEditPlaylistDialog,
    displayConfirmActionDialog,
    hideConfirmActionDialog,
    displaySelectPlaylistDialog,
    hideSelectPlaylistDialog,
    displaySnackbar,
    hideSnackbar,
} = globalSlice.actions

export default globalSlice.reducer
