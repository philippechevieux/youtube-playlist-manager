export enum PlaylistDisplayModeEnum {
    MOSAIC = 'mosaic',
    LIST = 'list'
}

export enum AvailableLangague {
    FR = 'fr',
    EN = 'en'
}

export interface UserDataInterface {
    accessToken: string;
    language: AvailableLangague;
    googleId: string;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    fullName: string;
    isUserLogin: boolean;
    playlistDisplayMode: string;
}

export const userDefaultData: UserDataInterface = {
    accessToken: '',
    language: AvailableLangague.EN,
    googleId: '',
    email: '',
    avatar: '',
    firstName: '',
    lastName: '',
    fullName: '',
    isUserLogin: false,
    playlistDisplayMode: PlaylistDisplayModeEnum.MOSAIC
};
