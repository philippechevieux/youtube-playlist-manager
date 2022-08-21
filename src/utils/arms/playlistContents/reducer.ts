import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemInterface } from '../playlists/state'
import { PlaylistContentsDataInterface, playlistContentsDefaultData } from './state'

export const playlistContentsSlice = createSlice({
    name: 'playlistContents',
    initialState: playlistContentsDefaultData,
    reducers: {
        addPlaylistContents: (
            state: any,
            action: PayloadAction<{ playlistId: string; playListContentsData: PlaylistContentsDataInterface }>
        ) => {
            if (state.playlistId !== action.payload.playlistId) {
                state.playlistId = action.payload.playlistId
                state.items = []
            }

            state.prevPageToken = action.payload.playListContentsData.prevPageToken
                ? action.payload.playListContentsData.prevPageToken
                : undefined
            state.nextPageToken = action.payload.playListContentsData.nextPageToken
                ? action.payload.playListContentsData.nextPageToken
                : undefined
            state.items = [...state.items, ...action.payload.playListContentsData.items]
        },
        removePlaylistContents: (state: any, action: PayloadAction<{}>) => {
            state.playlistId = playlistContentsDefaultData.playlistId
            state.prevPageToken = playlistContentsDefaultData.prevPageToken
            state.nextPageToken = playlistContentsDefaultData.nextPageToken
            state.items = playlistContentsDefaultData.items
        },
        removeContent: (state: any, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((item: ItemInterface) => item.id !== action.payload.id)
        },
    },
})

export const { addPlaylistContents, removePlaylistContents, removeContent } = playlistContentsSlice.actions

export default playlistContentsSlice.reducer
