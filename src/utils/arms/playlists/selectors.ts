import { RootState } from '../../../app/store'

export const selectPlaylistsPrevPageToken = (state: RootState) => {
    return state.playlists.prevPageToken
}

export const selectPlaylistsCurrentPageToken = (state: RootState) => {
    return state.playlists.currentPageToken
}

export const selectPlaylistsNextPageToken = (state: RootState) => {
    return state.playlists.nextPageToken
}

export const selectPlaylistsItems = (state: RootState) => {
    return state.playlists.items
}

export const selectPlaylistItem = (state: RootState, playlistId: string | undefined) => {
    const playlistItem = Object.values(state.playlists.items).filter((item) => {
        return item.id === playlistId
    })

    return playlistItem[0]
}
