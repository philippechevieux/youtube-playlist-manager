import { IApiParams } from './interface'

const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/'

export function getYoutubePlaylists(accessToken: string, pageToken?: string) {
    const params: IApiParams = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 50,
    }

    if (pageToken !== undefined) {
        params.pageToken = pageToken
    }

    return getApi(accessToken, 'playlists', params)
}

export function getYoutubePlaylistsItems(accessToken: string, playlistId: string, pageToken?: string) {
    const params: IApiParams = {
        part: 'snippet,contentDetails,id,status',
        playlistId: playlistId,
        maxResults: 50,
    }

    if (pageToken !== undefined) {
        params.pageToken = pageToken
    }

    return getApi(accessToken, 'playlistItems', params)
}

function getApi(accessToken: string, endPoint: string, params: IApiParams) {
    let apiUrl = `${BASE_API_URL}${endPoint}?access_token=${accessToken}`

    Object.entries(params).forEach(([key, value]) => {
        apiUrl = apiUrl + `&${key}=${decodeURIComponent(value)}`
    })

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            //TODO : Ajouter une gection des erreurs
            console.log('error', error)
        })
}
