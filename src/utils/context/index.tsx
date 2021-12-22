import React, { useState, createContext, ReactElement } from 'react'
import { IGoogleAccountDataReceive, IGoogleAccountData, IGoogleContext } from './interface'

export const defaultGoogleAccountData: IGoogleAccountData = {
    accessToken: '',
    googleId: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    fullName: '',
    isUserLogin: false,
}

const defaultGoogleAccountDataContext: IGoogleContext = {
    googleAccountData: defaultGoogleAccountData,
    saveGoogleAccountData: () => {},
}

export const GoogleAccountDataContext = createContext<IGoogleContext>(defaultGoogleAccountDataContext)

export const GoogleAccountDataProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
    const [googleAccountData, setGoogleAccountData] = useState(defaultGoogleAccountData)

    // TODO: Handle case where login fail
    const saveGoogleAccountData = (googleAccountDataReceive: IGoogleAccountDataReceive) => {
        let newGoogleAccountData = defaultGoogleAccountData

        if (googleAccountDataReceive.accessToken !== '') {
            newGoogleAccountData = {
                accessToken: googleAccountDataReceive.accessToken,
                googleId: googleAccountDataReceive.profileObj['googleId'],
                email: googleAccountDataReceive.profileObj['email'],
                avatar: googleAccountDataReceive.profileObj['imageUrl'],
                firstName: googleAccountDataReceive.profileObj['givenName'],
                lastName: googleAccountDataReceive.profileObj['familyName'],
                fullName: googleAccountDataReceive.profileObj['name'],
                isUserLogin: true,
            }
        }
        setGoogleAccountData(newGoogleAccountData)
    }

    return (
        <GoogleAccountDataContext.Provider value={{ googleAccountData, saveGoogleAccountData }}>
            {children}
        </GoogleAccountDataContext.Provider>
    )
}
