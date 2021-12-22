export interface IGoogleAccountDataReceive {
    accessToken: string
    profileObj: {
        googleId: string
        email: string
        imageUrl: string
        givenName: string
        familyName: string
        name: string
    }
}

export interface IGoogleAccountData {
    accessToken: string
    googleId: string
    email: string
    avatar: string
    firstName: string
    lastName: string
    fullName: string
    isUserLogin: boolean
}

export interface IGoogleContext {
    googleAccountData: IGoogleAccountData
    saveGoogleAccountData: Function
}
