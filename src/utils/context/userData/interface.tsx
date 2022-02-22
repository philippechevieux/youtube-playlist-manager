import { Dispatch } from 'react'
import { UserDataAction } from '../../reducer/userData'

// export interface IGoogleAccountDataReceive {
//     accessToken: string
//     profileObj: {
//         googleId: string
//         email: string
//         imageUrl: string
//         givenName: string
//         familyName: string
//         name: string
//     }
// }

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
}

export interface IUserDataContext {
    state: IUserData
    dispatch: Dispatch<UserDataAction>
}
