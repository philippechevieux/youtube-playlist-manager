export enum PlaylistDisplayModeEnum {
    MOSAIC = 'mosaic',
    LIST = 'list'
}

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
    playlistDisplayMode: string;
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
    isUserLogin: false,
    playlistDisplayMode: PlaylistDisplayModeEnum.MOSAIC
};
