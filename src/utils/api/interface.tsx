export interface IApiUrlParams {
    part?: string
    maxResults?: number
    mine?: boolean
    playlistId?: string
    pageToken?: string
    id?: string
}

export interface IApiBodyParams {
    id?: string
    snippet?: {
        title: string
        description: string
    }
    status?: {
        privacyStatus: string
    }
}

export interface IApiUpdatePlaylistParams {
    title: string
    description: string
    privacyStatus: string
}
