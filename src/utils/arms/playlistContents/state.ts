export interface ResourceIdInterface {
    kind: string;
    videoId: string;
}

export const defaultItemResourceId: ResourceIdInterface = {
    kind: '',
    videoId: ''
};

export interface ItemInterface {
    id: string;
    snippet: {
        title: string;
        videoOwnerChannelTitle: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
        resourceId: ResourceIdInterface;
    };
    contentDetails: {
        videoId: string;
    };
}

export interface ContentsInterface {
    items: Array<ItemInterface>;
}

export interface PlaylistContentsDataInterface {
    playlistId: string;
    prevPageToken: string | undefined;
    nextPageToken: string | undefined;
    items: Array<ItemInterface>;
}

export interface PlaylistsContentsDataInterface {
    playlists: {
        [playlistId: string]: PlaylistContentsDataInterface;
    };
}

export const playlistContentsDefaultData: PlaylistsContentsDataInterface = {
    playlists: {}
};
