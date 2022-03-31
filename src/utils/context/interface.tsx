import { Dispatch } from 'react'
import { IResourceId } from '../api/interface'
import { ReducerAction } from '../reducer'

export interface IUserData {
    accessToken: string
    language: string
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
    selectPlaylistDialogOnSave: Function
    currentPlaylistId: string
    selectPlaylistDialogHideCurrentPlaylist: boolean
}

export interface IPlaylistItemsContent {
    id: string
    snippet: {
        title: string
        videoOwnerChannelTitle: string
        thumbnails: {
            high: {
                url: string
            }
        }
        resourceId: IResourceId
    }
}

export interface IPlaylistsListItems {
    items: Array<IPlaylistItemsContent>
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
