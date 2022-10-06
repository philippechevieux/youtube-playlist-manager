import {IResourceId} from '../api/interface';

export interface IPlaylistItemsContent {
    id: string;
    snippet: {
        title: string;
        videoOwnerChannelTitle: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
        resourceId: IResourceId;
    };
}

export interface IPlaylistsListItems {
    items: Array<IPlaylistItemsContent>;
}
