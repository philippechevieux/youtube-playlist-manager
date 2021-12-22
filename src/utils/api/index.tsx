import { IApiParams } from './interface'

const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/'

export function getYoutubePlaylists(accessToken: string) {
    const params = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 100,
    }

    return getApi(accessToken, 'playlists', params)
}

export function getYoutubePlaylistsItems(accessToken: string, playlistId: string) {
    const params = {
        part: 'snippet,contentDetails,id,status',
        playlistId: playlistId,
        maxResults: 50,
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
