export interface IPlaylistsItemData {
    id: string
    snippet: {
        localized: {
            title: string
            description: string
        }
        thumbnails: {
            high: {
                url: string
            }
        }
    }
    status: {
        privacyStatus: string
    }
}

export interface IPlaylistsData {
    items: Array<IPlaylistsItemData>
}
