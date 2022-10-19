import axios from 'axios';
import {IApiUrlParams, IApiBodyParams, IApiUpdatePlaylistParams, IResourceId, RequestMethodEnum} from './interface';

const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/';

const toPostData = (datas: IApiBodyParams | undefined) => {
    let str = '';

    if (datas) {
        Object.entries(datas).forEach(([key, value]) => {
            str = str + `&${key}=${decodeURIComponent(value)}`;
        });
    }

    return str;
};

function requestApi(
    accessToken: string,
    method: RequestMethodEnum,
    endPoint: string,
    urlParams: IApiUrlParams,
    bodyParams?: IApiBodyParams
) {
    let apiUrl = `${BASE_API_URL}${endPoint}?access_token=${accessToken}` + toPostData(urlParams);

    return axios({
        method: method,
        url: apiUrl,
        responseType: 'json',
        data: bodyParams
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        });
}

export function getYoutubePlaylists(accessToken: string, pageToken?: string, playlistIds?: Array<String>) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 10
    };

    if (pageToken !== undefined) {
        urlParams.pageToken = pageToken;
    }

    if (playlistIds !== undefined) {
        delete urlParams.mine;
        urlParams.id = playlistIds.join(',');
    }

    return requestApi(accessToken, RequestMethodEnum.GET, 'playlists', urlParams);
}

export function updatePlaylistData(accessToken: string, playlistId: string, data: IApiUpdatePlaylistParams) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,status'
    };

    const bodyParams: IApiBodyParams = {
        id: playlistId,
        snippet: {
            title: data.title,
            description: data.description
        },
        status: {
            privacyStatus: data.privacyStatus
        }
    };

    return requestApi(accessToken, RequestMethodEnum.PUT, 'playlists', urlParams, bodyParams);
}

export function getYoutubePlaylistsItems(accessToken: string, playlistId: string, pageToken?: string) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,contentDetails,id,status',
        playlistId: playlistId,
        maxResults: 50
    };

    if (pageToken !== undefined) {
        urlParams.pageToken = pageToken;
    }

    return requestApi(accessToken, RequestMethodEnum.GET, 'playlistItems', urlParams);
}

export function deleteItemFromPlaylist(accessToken: string, itemId: string) {
    const urlParams: IApiUrlParams = {
        part: 'id'
    };

    const bodyParams: IApiBodyParams = {
        id: itemId
    };

    return requestApi(accessToken, RequestMethodEnum.DELETE, 'playlistItems', urlParams, bodyParams);
}

export function insertItemToPlaylist(accessToken: string, resourceId: IResourceId, playlistId: string) {
    const urlParams: IApiUrlParams = {
        part: 'snippet'
    };

    const bodyParams: IApiBodyParams = {
        snippet: {
            playlistId: playlistId,
            resourceId: resourceId
        }
    };

    return requestApi(accessToken, RequestMethodEnum.POST, 'playlistItems', urlParams, bodyParams);
}
