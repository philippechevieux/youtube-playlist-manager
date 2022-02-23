import { IUserData } from '../../context/userData/interface'
import { userDefaultData } from './../../context/userData/index'

export enum UserDataActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGOUT = 'USER_LOGOUT',
    DISPLAY_SNACK_BAR = 'DISPLAY_SNACK_BAR',
    HIDE_SNACK_BAR = 'HIDE_SNACK_BAR',
    DISPLAY_CONFIRM_ACTION_DIALOG = 'DISPLAY_CONFIRM_ACTION_DIALOG',
    HIDE_CONFIRM_ACTION_DIALOG = 'HIDE_CONFIRM_ACTION_DIALOG',
}

// TODO Remove any
export type UserDataAction =
    | {
          type: UserDataActionTypes.USER_LOGIN
          googleLoginResponse: any
      }
    | {
          type: UserDataActionTypes.USER_LOGOUT
      }
    | {
          type: UserDataActionTypes.DISPLAY_SNACK_BAR
          snackbarSeverity: string
          snackbarContent: string
      }
    | {
          type: UserDataActionTypes.HIDE_SNACK_BAR
      }
    | {
          type: UserDataActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG
          confirmActionDialogOnExecute: Function
          confirmActionDialogExecuteButtonLabel: string
          confirmActionDialogContentMessage: string
      }
    | {
          type: UserDataActionTypes.HIDE_CONFIRM_ACTION_DIALOG
      }

export const UserDataReducer = (state: IUserData, action: UserDataAction): IUserData => {
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
        case UserDataActionTypes.DISPLAY_SNACK_BAR: {
            let newData = { ...state }
            newData.isSnackbarDisplayed = true
            newData.snackbarSeverity = action.snackbarSeverity
            newData.snackbarContent = action.snackbarContent

            return newData
        }
        case UserDataActionTypes.HIDE_SNACK_BAR: {
            let newData = { ...state }
            newData.isSnackbarDisplayed = false
            newData.snackbarSeverity = ''
            newData.snackbarContent = ''

            return newData
        }
        case UserDataActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG: {
            let newData = { ...state }
            newData.isConfirmActionDialogOpen = true
            newData.confirmActionDialogOnExecute = action.confirmActionDialogOnExecute
            newData.confirmActionDialogExecuteButtonLabel = action.confirmActionDialogExecuteButtonLabel
            newData.confirmActionDialogContentMessage = action.confirmActionDialogContentMessage

            return newData
        }
        case UserDataActionTypes.HIDE_CONFIRM_ACTION_DIALOG: {
            let newData = { ...state }
            newData.isConfirmActionDialogOpen = false
            newData.confirmActionDialogOnExecute = () => {}
            newData.confirmActionDialogExecuteButtonLabel = ''
            newData.confirmActionDialogContentMessage = ''

            return newData
        }
    }
}
