import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    },
})

export const { addPlaylistContents } = playlistContentsSlice.actions

export default playlistContentsSlice.reducer
