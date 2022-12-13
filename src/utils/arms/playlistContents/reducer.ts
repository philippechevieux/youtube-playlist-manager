import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemInterface} from '../playlists/state';
import {PlaylistContentsDataInterface, playlistContentsDefaultData} from './state';

export const playlistContentsSlice = createSlice({
    name: 'playlistContents',
    initialState: playlistContentsDefaultData,
    reducers: {
        addPlaylistContents: (
            state: any,
            action: PayloadAction<{playlistId: string; playListContentsData: PlaylistContentsDataInterface}>
        ) => {
            if (!state.playlists[action.payload.playlistId]) {
                // Init with default values before setting values from the payload
                state.playlists[action.payload.playlistId] = {
                    prevPageToken: undefined,
                    nextPageToken: undefined,
                    items: []
                };
            }

            state.playlists[action.payload.playlistId].prevPageToken = action.payload.playListContentsData.prevPageToken
                ? action.payload.playListContentsData.prevPageToken
                : undefined;

            state.playlists[action.payload.playlistId].nextPageToken = action.payload.playListContentsData.nextPageToken
                ? action.payload.playListContentsData.nextPageToken
                : undefined;

            // Remove duplicate items
            const itemFiltered = action.payload.playListContentsData.items.filter(
                item =>
                    state.playlists[action.payload.playlistId].items.filter(
                        (inStoreItem: ItemInterface) => inStoreItem.id === item.id
                    ).length === 0
            );

            state.playlists[action.payload.playlistId].items = [
                ...state.playlists[action.payload.playlistId].items,
                ...itemFiltered
            ];
        },
        removeContent: (state: any, action: PayloadAction<{id: string}>) => {
            state.items = state.items.filter((item: ItemInterface) => item.id !== action.payload.id);
        },
        setEmptyPlaylistContents: (state: any) => {
            state.playlists = playlistContentsDefaultData;
        }
    }
});

export const {addPlaylistContents, removeContent, setEmptyPlaylistContents} = playlistContentsSlice.actions;

export default playlistContentsSlice.reducer;
