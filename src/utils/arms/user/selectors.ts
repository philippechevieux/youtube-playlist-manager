import { RootState } from '../../../app/store'

export const selectIsUserLogin = (state: RootState) => {
    return state.user.isUserLogin
}

export const selectUserFullName = (state: RootState) => {
    return state.user.fullName
}

export const selectUserAvatar = (state: RootState) => {
    return state.user.avatar
}

export const selectUserLanguage = (state: RootState) => {
    return state.user.language
}

export const selectUserAccessToken = (state: RootState) => {
    return state.user.accessToken
}
