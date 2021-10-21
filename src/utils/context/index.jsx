import React, { useState, createContext } from 'react'

export const GoogleAccountDataContext = createContext()

export const GoogleAccountDataProvider = ({ children }) => {
    const [googleAccountData, setGoogleAccountData] = useState(null)

    // TODO: gérer le cas du login failed
    const saveGoogleAccountData = (googleAccountDataReceive) => {
        let newGoogleAccountData = null

        if (googleAccountDataReceive !== null) {
            newGoogleAccountData = {
                accessToken: googleAccountDataReceive.accessToken,
                googleId: googleAccountDataReceive.profileObj['googleId'],
                email: googleAccountDataReceive.profileObj['email'],
                avatar: googleAccountDataReceive.profileObj['imageUrl'],
                firstName: googleAccountDataReceive.profileObj['givenName'],
                lastName: googleAccountDataReceive.profileObj['familyName'],
                fullName: googleAccountDataReceive.profileObj['name'],
            }
        }

        console.log('-> setGoogleAccountData', newGoogleAccountData)
        setGoogleAccountData(newGoogleAccountData)
    }

    return (
        <GoogleAccountDataContext.Provider value={{ googleAccountData, saveGoogleAccountData }}>
            {children}
        </GoogleAccountDataContext.Provider>
    )
}
