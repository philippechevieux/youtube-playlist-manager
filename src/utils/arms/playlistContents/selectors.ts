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
