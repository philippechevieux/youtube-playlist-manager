import { useReducer, createContext, ReactElement } from 'react'
import { IUserData, IUserDataContext } from './interface'
import { UserDataReducer } from './../../reducer/userData/index'

export const userDefaultData: IUserData = {
    accessToken: '',
    googleId: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    fullName: '',
    isUserLogin: false,
    isSnackbarDisplayed: false,
    snackbarSeverity: '',
    snackbarContent: '',
}

const userDefaultDataContext = {
    state: userDefaultData,
    dispatch: () => {},
}

export const UserDataContext = createContext<IUserDataContext>(userDefaultDataContext)

export const UserDataProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
    const [state, dispatch] = useReducer(UserDataReducer, userDefaultData)

    return <UserDataContext.Provider value={{ state, dispatch }}>{children}</UserDataContext.Provider>
}
