import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApiUpdatePlaylistParams } from '../../api/interface'
import { ItemInterface, PlaylistsDataInterface, playlistsDefaultData } from './state'

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: playlistsDefaultData,
    reducers: {
        addPlaylists: (state: any, action: PayloadAction<{ playlistsData: PlaylistsDataInterface }>) => {
            if (
                (!('nextPageToken' in action.payload.playlistsData) && state.nextPageToken !== undefined) ||
                (state.nextPageToken === undefined && 'nextPageToken' in action.payload.playlistsData) ||
                ('nextPageToken' in action.payload.playlistsData &&
                    action.payload.playlistsData.nextPageToken !== state.nextPageToken)
            ) {
                state.items = [...state.items, ...action.payload.playlistsData.items]
            }

            if (
                'prevPageTokenaction' in action.payload.playlistsData &&
                action.payload.playlistsData.prevPageToken !== undefined
            ) {
                state.prevPageToken = action.payload.playlistsData.prevPageToken
            }

            if (
                'nextPageToken' in action.payload.playlistsData &&
                action.payload.playlistsData.nextPageToken !== undefined
            ) {
                state.nextPageToken = action.payload.playlistsData.nextPageToken
            }
        },
        updatePlaylist: (
            state: any,
            action: PayloadAction<{ playlistId: string; dataToUpdate: IApiUpdatePlaylistParams }>
        ) => {
            state.items.forEach((item: ItemInterface) => {
                if (item.id === action.payload.playlistId) {
                    item.snippet.localized.title = action.payload.dataToUpdate.title
                    item.snippet.localized.description = action.payload.dataToUpdate.description
                    item.status.privacyStatus = action.payload.dataToUpdate.privacyStatus
                }
            })
        },
    },
})

export const { addPlaylists, updatePlaylist } = playlistsSlice.actions

export default playlistsSlice.reducer
