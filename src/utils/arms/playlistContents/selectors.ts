import {RootState} from '../../../app/store';

export const selectPlaylistContentsPrevPageToken = (state: RootState) => {
    return state.playlistContents.prevPageToken;
};

export const selectPlaylistContentsNextPageToken = (state: RootState) => {
    return state.playlistContents.nextPageToken;
};

export const selectPlaylistContentsItems = (state: RootState) => {
    return state.playlistContents.items;
};

export const selectPlaylistContentsItemsByIndex = (state: RootState, index: number | undefined) => {
    return index !== undefined ? state.playlistContents.items[index] : undefined;
};
