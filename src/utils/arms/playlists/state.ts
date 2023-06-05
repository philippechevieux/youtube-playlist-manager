export interface ItemInterface {
    id: string;
    snippet: {
        localized: {
            title: string;
            description: string;
        };
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
    status: {
        privacyStatus: privacyStatusEnum;
    };
    selected?: boolean;
}

export enum privacyStatusEnum {
    PUBLIC = 'public',
    UNLISTED = 'unlisted',
    PRIVATE = 'private'
}

export interface ItemsInterface {
    items: Array<ItemInterface>;
}

export interface PlaylistsDataInterface {
    prevPageToken: string | undefined;
    currentPageToken: string | undefined;
    nextPageToken: string | undefined;
    items: Array<ItemInterface>;
}

export const playlistsDefaultData: PlaylistsDataInterface = {
    prevPageToken: undefined,
    currentPageToken: undefined,
    nextPageToken: undefined,
    items: []
};
