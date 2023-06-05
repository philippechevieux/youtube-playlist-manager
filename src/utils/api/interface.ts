import {privacyStatusEnum} from '../arms/playlists/state';

export interface IApiUrlParams {
    part?: string;
    maxResults?: number;
    mine?: boolean;
    playlistId?: string;
    pageToken?: string;
    id?: string;
}

export interface IApiBodyParams {
    id?: string;
    snippet?: {
        title?: string;
        description?: string;
        resourceId?: IResourceId;
        playlistId?: string;
    };
    status?: {
        privacyStatus: privacyStatusEnum;
    };
}

export interface IApiUpdatePlaylistParams {
    title: string;
    description: string;
    privacyStatus: privacyStatusEnum;
}

export interface IResourceId {
    kind: string;
    videoId: string;
}

export enum RequestMethodEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}
