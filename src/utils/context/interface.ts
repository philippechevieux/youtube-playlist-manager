import { IResourceId } from '../api/interface'

export interface IPlaylistItemsContent {
    id: string
    snippet: {
        title: string
        videoOwnerChannelTitle: string
        thumbnails: {
            high: {
                url: string
            }
        }
        resourceId: IResourceId
    }
}

export interface IPlaylistsListItems {
    items: Array<IPlaylistItemsContent>
}

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
    selected?: boolean
}

export interface IPlaylistsData {
    items: Array<IPlaylistsItemData>
}
