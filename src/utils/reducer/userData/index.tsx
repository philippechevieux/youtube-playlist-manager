import { IUserData } from '../../context/userData/interface'
import { userDefaultData } from './../../context/userData/index'

export enum UserDataActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGOUT = 'USER_LOGOUT',
    ERROR_FROM_API = 'ERROR_FROM_API',
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
          type: UserDataActionTypes.ERROR_FROM_API
          isSnackbarDisplayed: boolean
          snackbarSeverity: string
          snackbarContent: string
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
        case UserDataActionTypes.ERROR_FROM_API: {
            let newData = { ...state }
            newData.isSnackbarDisplayed = action.isSnackbarDisplayed
            newData.snackbarSeverity = action.snackbarSeverity
            newData.snackbarContent = action.snackbarContent

            return newData
        }
    }
}
