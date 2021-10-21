const BASE_API_URL = 'https://www.googleapis.com/youtube/v3/'

export function getYoutubePlaylists(access_token) {
    const params = {
        part: 'snippet,contentDetails,id,localizations,player,snippet,status',
        mine: true,
        maxResults: 100,
    }

    return getApi(access_token, 'playlists', params)
}

function getApi(access_token, end_point, params) {
    let apiUrl = `${BASE_API_URL}${end_point}?access_token=${access_token}`

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
