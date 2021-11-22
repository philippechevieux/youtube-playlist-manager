const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/'

export function getYoutubePlaylists(accessToken) {
    const params = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 100,
    }

    return getApi(accessToken, 'playlists', params)
}

export function getYoutubePlaylistsItems(accessToken, playlistId) {
    const params = {
        part: 'snippet,contentDetails,id,status',
        playlistId: playlistId,
        maxResults: 50,
    }

    return getApi(accessToken, 'playlistItems', params)
}

function getApi(accessToken, endPoint, params) {
    let apiUrl = `${BASE_API_URL}${endPoint}?access_token=${accessToken}`

    Object.keys(params).map((key) => {
        apiUrl = apiUrl + `&${key}=${decodeURIComponent(params[key])}`
    })

    console.log('apiUrl : ', apiUrl)

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
