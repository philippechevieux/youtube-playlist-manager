import { RootState } from '../../../app/store'

export const selectPlaylistsPrevPageToken = (state: RootState) => {
    return state.playlists.prevPageToken
}

export const selectPlaylistsNextPageToken = (state: RootState) => {
    return state.playlists.nextPageToken
}

export const selectPlaylistsItems = (state: RootState) => {
    return state.playlists.items
}
