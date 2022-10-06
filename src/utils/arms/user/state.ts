export interface UserDataInterface {
    accessToken: string;
    language: string;
    googleId: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    fullName: string;
    isUserLogin: boolean;
}

export const userDefaultData: UserDataInterface = {
    accessToken: '',
    language: 'fr',
    googleId: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    fullName: '',
    isUserLogin: false
};
