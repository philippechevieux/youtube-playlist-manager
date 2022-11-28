import {RootState} from '../../../app/store';

export const selectPlaylistContentsPrevPageToken = (state: RootState, playlistId: string) => {
    if (state.playlistContents.playlists[playlistId]) {
        return state.playlistContents.playlists[playlistId].prevPageToken;
    }

    return undefined;
};

export const selectPlaylistContentsNextPageToken = (state: RootState, playlistId: string) => {
    if (state.playlistContents.playlists[playlistId]) {
        return state.playlistContents.playlists[playlistId].nextPageToken;
    }

    return undefined;
};

export const selectPlaylistContentsItems = (state: RootState, playlistId: string) => {
    if (state.playlistContents.playlists[playlistId]) {
        return state.playlistContents.playlists[playlistId].items;
    }

    return [];
};

export const selectPlaylistContentsItemsByIndex = (state: RootState, playlistId: string, index: number | undefined) => {
    return index !== undefined ? state.playlistContents.playlists[playlistId].items[index] : undefined;
};
