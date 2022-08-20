export interface ResourceIdInterface {
    kind: string
    videoId: string
}

export interface ItemInterface {
    id: string
    snippet: {
        title: string
        videoOwnerChannelTitle: string
        thumbnails: {
            high: {
                url: string
            }
        }
        resourceId: ResourceIdInterface
    }
}

export interface ContentsInterface {
    items: Array<ItemInterface>
}

export interface PlaylistContentsDataInterface {
    playlistId: string
    prevPageToken: string | undefined
    nextPageToken: string | undefined
    items: Array<ItemInterface>
}

export const playlistContentsDefaultData: PlaylistContentsDataInterface = {
    playlistId: '',
    prevPageToken: undefined,
    nextPageToken: undefined,
    items: [],
}
