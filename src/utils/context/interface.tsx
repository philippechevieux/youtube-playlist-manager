import { Dispatch } from 'react'
import { ReducerAction } from '../reducer'

export interface IUserData {
    accessToken: string
    googleId: string
    email: string
    avatar: string
    firstName: string
    lastName: string
    fullName: string
    isUserLogin: boolean
    isSnackbarDisplayed: boolean
    snackbarSeverity: string
    snackbarContent: string
    isConfirmActionDialogOpen: boolean
    confirmActionDialogOnExecute: Function
    confirmActionDialogExecuteButtonLabel: string
    confirmActionDialogContentMessage: string
    isEditPlaylistDialogOpen: boolean
    editPlaylistDialogData: IPlaylistsItemData
    editPlaylistDialogOnClose: Function
    editPlaylistDialogId: string
    isSelectPlaylistDialogOpen: boolean
    selectPlaylistDialogMode: string
    selectPlaylistDialogOnClose: Function
}

export interface IUserDataContext {
    state: IUserData
    dispatch: Dispatch<ReducerAction>
}

export interface IPlaylistsItemData {
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

export interface IPlaylistsData {
    items: Array<IPlaylistsItemData>
}
