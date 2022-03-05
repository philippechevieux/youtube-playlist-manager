import { IUserData } from '../context/interface'
import { userDefaultData, DefaultPlaylistItemData } from '../context/index'
import { IPlaylistsItemData } from '../context/interface'

export enum UserDataActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGOUT = 'USER_LOGOUT',
}

export enum DialogActionTypes {
    DISPLAY_SNACK_BAR = 'DISPLAY_SNACK_BAR',
    HIDE_SNACK_BAR = 'HIDE_SNACK_BAR',
    DISPLAY_CONFIRM_ACTION_DIALOG = 'DISPLAY_CONFIRM_ACTION_DIALOG',
    HIDE_CONFIRM_ACTION_DIALOG = 'HIDE_CONFIRM_ACTION_DIALOG',
    DISPLAY_EDIT_PLAYLIST_DIALOG = 'DISPLAY_EDIT_PLAYLIST_DIALOG',
    HIDE_EDIT_PLAYLIST_DIALOG = 'HIDE_EDIT_PLAYLIST_DIALOG',
}

export type ReducerAction =
    | {
          type: UserDataActionTypes.USER_LOGIN
          googleLoginResponse: any
      }
    | {
          type: UserDataActionTypes.USER_LOGOUT
      }
    | {
          type: DialogActionTypes.DISPLAY_SNACK_BAR
          snackbarSeverity: string
          snackbarContent: string
      }
    | {
          type: DialogActionTypes.HIDE_SNACK_BAR
      }
    | {
          type: DialogActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG
          confirmActionDialogOnExecute: Function
          confirmActionDialogExecuteButtonLabel: string
          confirmActionDialogContentMessage: string
      }
    | {
          type: DialogActionTypes.HIDE_CONFIRM_ACTION_DIALOG
      }
    | {
          type: DialogActionTypes.DISPLAY_EDIT_PLAYLIST_DIALOG
          playlistData: IPlaylistsItemData
          setPlaylistData: Function
          playlistId: string
      }
    | {
          type: DialogActionTypes.HIDE_EDIT_PLAYLIST_DIALOG
      }

export const UserDataReducer = (state: IUserData, action: ReducerAction): IUserData => {
    switch (action.type) {
        case UserDataActionTypes.USER_LOGIN: {
            if (state.isUserLogin === false) {
                let newData = { ...userDefaultData }
                newData.accessToken = action.googleLoginResponse.accessToken
                newData.googleId = action.googleLoginResponse.profileObj['googleId']
                newData.email = action.googleLoginResponse.profileObj['email']
                newData.avatar = action.googleLoginResponse.profileObj['imageUrl']
                newData.firstName = action.googleLoginResponse.profileObj['givenName']
                newData.lastName = action.googleLoginResponse.profileObj['familyName']
                newData.fullName = action.googleLoginResponse.profileObj['name']
                newData.isUserLogin = true

                return newData
            }

            return state
        }
        case UserDataActionTypes.USER_LOGOUT: {
            let newData = { ...userDefaultData }
            newData.isUserLogin = false

            return newData
        }
        case DialogActionTypes.DISPLAY_SNACK_BAR: {
            let newData = { ...state }
            newData.isSnackbarDisplayed = true
            newData.snackbarSeverity = action.snackbarSeverity
            newData.snackbarContent = action.snackbarContent

            return newData
        }
        case DialogActionTypes.HIDE_SNACK_BAR: {
            let newData = { ...state }
            newData.isSnackbarDisplayed = false
            newData.snackbarSeverity = ''
            newData.snackbarContent = ''

            return newData
        }
        case DialogActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG: {
            let newData = { ...state }
            newData.isConfirmActionDialogOpen = true
            newData.confirmActionDialogOnExecute = action.confirmActionDialogOnExecute
            newData.confirmActionDialogExecuteButtonLabel = action.confirmActionDialogExecuteButtonLabel
            newData.confirmActionDialogContentMessage = action.confirmActionDialogContentMessage

            return newData
        }
        case DialogActionTypes.HIDE_CONFIRM_ACTION_DIALOG: {
            let newData = { ...state }
            newData.isConfirmActionDialogOpen = false
            newData.confirmActionDialogOnExecute = () => {}
            newData.confirmActionDialogExecuteButtonLabel = ''
            newData.confirmActionDialogContentMessage = ''

            return newData
        }
        case DialogActionTypes.DISPLAY_EDIT_PLAYLIST_DIALOG: {
            let newData = { ...state }
            newData.isEditPlaylistDialogOpen = true
            newData.editPlaylistDialogPlaylistData = action.playlistData
            newData.editPlaylistDialogSetPlaylistData = action.setPlaylistData
            newData.editPlaylistDialogPlaylistId = action.playlistId

            return newData
        }
        case DialogActionTypes.HIDE_EDIT_PLAYLIST_DIALOG: {
            let newData = { ...state }
            newData.isEditPlaylistDialogOpen = false
            newData.editPlaylistDialogPlaylistData = DefaultPlaylistItemData
            newData.editPlaylistDialogSetPlaylistData = () => {}
            newData.editPlaylistDialogPlaylistId = ''

            return newData
        }
    }
}
