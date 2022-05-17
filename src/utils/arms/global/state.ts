export interface PlaylistsItemDataInterface {
    id: string
    snippet: {
        localized: {
            title: string
            description: string
        }
        thumbnails: {
            high: {
                url: string
            }
        }
    }
    status: {
        privacyStatus: string
    }
    selected?: boolean
}

export interface GlobalDataInterface {
    isSnackbarDisplayed: boolean
    snackbarSeverity: string
    snackbarContent: string
    isConfirmActionDialogOpen: boolean
    confirmActionDialogOnExecute: Function
    confirmActionDialogExecuteButtonLabel: string
    confirmActionDialogContentMessage: string
    isEditPlaylistDialogOpen: boolean
    editPlaylistDialogData: PlaylistsItemDataInterface
    editPlaylistDialogOnClose: Function
    editPlaylistDialogId: string
    isSelectPlaylistDialogOpen: boolean
    selectPlaylistDialogMode: string
    selectPlaylistDialogOnClose: Function
    selectPlaylistDialogOnSave: Function
    currentPlaylistId: string
    selectPlaylistDialogHideCurrentPlaylist: boolean
}

export const DefaultPlaylistItemData: PlaylistsItemDataInterface = {
    id: '',
    snippet: {
        localized: {
            title: '',
            description: '',
        },
        thumbnails: {
            high: {
                url: '',
            },
        },
    },
    status: {
        privacyStatus: '',
    },
}

export const globalDefaultData: GlobalDataInterface = {
    isSnackbarDisplayed: false,
    snackbarSeverity: '',
    snackbarContent: '',
    isConfirmActionDialogOpen: false,
    confirmActionDialogOnExecute: () => {},
    confirmActionDialogExecuteButtonLabel: '',
    confirmActionDialogContentMessage: '',
    isEditPlaylistDialogOpen: false,
    editPlaylistDialogData: DefaultPlaylistItemData,
    editPlaylistDialogOnClose: () => {},
    editPlaylistDialogId: '',
    isSelectPlaylistDialogOpen: false,
    selectPlaylistDialogMode: '',
    selectPlaylistDialogOnClose: () => {},
    selectPlaylistDialogOnSave: () => {},
    currentPlaylistId: '',
    selectPlaylistDialogHideCurrentPlaylist: false,
}
