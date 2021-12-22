import { IUserData } from '../../context/userData/interface'
import { userDefaultData } from './../../context/userData/index'

export enum UserDataActionTypes {
    USER_LOGIN = 'USER_LOGIN',
    USER_LOGOUT = 'USER_LOGOUT',
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

export const UserDataReducer = (state: IUserData, action: UserDataAction) => {
    switch (action.type) {
        case UserDataActionTypes.USER_LOGIN: {
            if (state.isUserLogin === false) {
                const newUserData = {
                    accessToken: action.googleLoginResponse.accessToken,
                    googleId: action.googleLoginResponse.profileObj['googleId'],
                    email: action.googleLoginResponse.profileObj['email'],
                    avatar: action.googleLoginResponse.profileObj['imageUrl'],
                    firstName: action.googleLoginResponse.profileObj['givenName'],
                    lastName: action.googleLoginResponse.profileObj['familyName'],
                    fullName: action.googleLoginResponse.profileObj['name'],
                    isUserLogin: true,
                }

                return newUserData
            }

            return state
        }
        case UserDataActionTypes.USER_LOGOUT: {
            const newData = userDefaultData
            newData.isUserLogin = false
            return newData
        }
    }
}
