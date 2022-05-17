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
