import { useReducer, createContext, ReactElement } from 'react'
import { IUserData, IUserDataContext } from './interface'
import { UserDataReducer } from '../reducer/index'
import { IPlaylistsItemData } from './interface'

export const DefaultPlaylistItemData: IPlaylistsItemData = {
    id: '',
    snippet: {
        localized: {
            title: '',
            description: '',
        },
        thumbnails: {
            high: {
                url: '',
            },
        },
    },
    status: {
        privacyStatus: '',
    },
}

export const defaultItemResourceId = {
    kind: '',
    videoId: '',
}

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
    isConfirmActionDialogOpen: false,
    confirmActionDialogOnExecute: () => {},
    confirmActionDialogExecuteButtonLabel: '',
    confirmActionDialogContentMessage: '',
    isEditPlaylistDialogOpen: false,
    editPlaylistDialogData: DefaultPlaylistItemData,
    editPlaylistDialogOnClose: () => {},
    editPlaylistDialogId: '',
    isSelectPlaylistDialogOpen: false,
    selectPlaylistDialogMode: '',
    selectPlaylistDialogOnClose: () => {},
    selectPlaylistDialogOnSave: () => {},
    currentPlaylistId: '',
    selectPlaylistDialogHideCurrentPlaylist: false,
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
