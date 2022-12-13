import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IApiUpdatePlaylistParams} from '../../api/interface';
import {ItemInterface, PlaylistsDataInterface, playlistsDefaultData} from './state';

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: playlistsDefaultData,
    reducers: {
        addPlaylists: (state: any, action: PayloadAction<{playlistsData: PlaylistsDataInterface}>) => {
            if (
                Object.values(state.items).length === 0 ||
                (!('nextPageToken' in action.payload.playlistsData) && state.nextPageToken !== undefined) ||
                (state.nextPageToken === undefined && 'nextPageToken' in action.payload.playlistsData) ||
                ('nextPageToken' in action.payload.playlistsData &&
                    action.payload.playlistsData.nextPageToken !== state.nextPageToken)
            ) {
                state.items = [...state.items, ...action.payload.playlistsData.items];
                state.currentPageToken = state.nextPageToken;
            }

            state.prevPageToken = action.payload.playlistsData.prevPageToken
                ? action.payload.playlistsData.prevPageToken
                : undefined;
            state.nextPageToken = action.payload.playlistsData.nextPageToken
                ? action.payload.playlistsData.nextPageToken
                : undefined;
        },
        updatePlaylist: (
            state: any,
            action: PayloadAction<{playlistId: string; dataToUpdate: IApiUpdatePlaylistParams}>
        ) => {
            state.items.forEach((item: ItemInterface) => {
                if (item.id === action.payload.playlistId) {
                    item.snippet.localized.title = action.payload.dataToUpdate.title;
                    item.snippet.localized.description = action.payload.dataToUpdate.description;
                    item.status.privacyStatus = action.payload.dataToUpdate.privacyStatus;
                }
            });
        },
        createPlaylist: (state: any, action: PayloadAction<{playlist: ItemInterface}>) => {
            state.items = [action.payload.playlist, ...state.items];
        },
        deletePlaylist: (state: any, action: PayloadAction<{playlistId: string}>) => {
            state.items = state.items.filter((item: ItemInterface) => {
                return item.id !== action.payload.playlistId;
            });
        },
        setEmptyPlaylists: (state: any) => {
            state.items = playlistsDefaultData.items;
            state.currentPageToken = playlistsDefaultData.currentPageToken;
            state.prevPageToken = playlistsDefaultData.prevPageToken;
            state.nextPageToken = playlistsDefaultData.nextPageToken;
        }
    }
});

export const {addPlaylists, updatePlaylist, createPlaylist, deletePlaylist, setEmptyPlaylists} = playlistsSlice.actions;

export default playlistsSlice.reducer;
