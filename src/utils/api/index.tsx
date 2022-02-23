import { IApiUrlParams, IApiBodyParams, IApiUpdatePlaylistParams } from './interface'

const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/'

export function getYoutubePlaylists(accessToken: string, pageToken?: string, playlistIds?: Array<String>) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 50,
    }

    if (pageToken !== undefined) {
        urlParams.pageToken = pageToken
    }

    if (playlistIds !== undefined) {
        delete urlParams.mine
        urlParams.id = playlistIds.join(',')
    }

    return requestApi(accessToken, 'GET', 'playlists', urlParams)
}

export function getYoutubePlaylistsItems(accessToken: string, playlistId: string, pageToken?: string) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,contentDetails,id,status',
        playlistId: playlistId,
        maxResults: 50,
    }

    if (pageToken !== undefined) {
        urlParams.pageToken = pageToken
    }

    return requestApi(accessToken, 'GET', 'playlistItems', urlParams)
}

export function updatePlaylistData(accessToken: string, playlistId: string, data: IApiUpdatePlaylistParams) {
    const urlParams: IApiUrlParams = {
        part: 'snippet,status',
    }

    const bodyParams: IApiBodyParams = {
        id: playlistId,
        snippet: {
            title: data.title,
            description: data.description,
        },
        status: {
            privacyStatus: data.privacyStatus,
        },
    }

    return requestApi(accessToken, 'PUT', 'playlists', urlParams, bodyParams)
}

export function deleteItemFromPlaylist(accessToken: string, itemId: string) {
    const urlParams: IApiUrlParams = {
        part: 'id',
    }

    const bodyParams: IApiBodyParams = {
        id: itemId,
    }

    return requestApi(accessToken, 'DELETE', 'playlistItems', urlParams, bodyParams)
}

function requestApi(
    accessToken: string,
    method: string,
    endPoint: string,
    urlParams: IApiUrlParams,
    bodyParams?: IApiBodyParams
) {
    let apiUrl = `${BASE_API_URL}${endPoint}?access_token=${accessToken}`

    Object.entries(urlParams).forEach(([key, value]) => {
        apiUrl = apiUrl + `&${key}=${decodeURIComponent(value)}`
    })

    let fetchInit: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (method !== 'GET') {
        fetchInit.body = JSON.stringify(bodyParams)
    }

    return fetch(apiUrl, fetchInit)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            //TODO : Trouver une astuce pour utiliser la snackbar
            return error
        })
}
