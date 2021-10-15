import { useEffect } from 'react'
import { getYoutubePlaylists } from '../../utils/api'

function PlaylistList({ googleAccountData }) {
    // const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/'

    // async function loadAllCurrentUserPlaylist(url, paramData) {
    //     console.log('-> loadAllCurrentUserPlaylist')

    //     // let apiUrl = `${BASE_API_URL}${end_point}?access_token=${access_token}`;
    //     // const params = {
    //     //     "part": "snippet,contentDetails,id,localizations,player,snippet,status",
    //     //     "mine": true,
    //     //     "maxResults": 50
    //     // }

    //     // return get_api(access_token, "playlists", params);

    //     let apiUrl = `${url}playlists?access_token=${paramData.accessToken}&`

    //     try {
    //         const response = await fetch(url, { mode: 'no-cors' })
    //         const data = await response.json()

    //         console.log('data', data)
    //     } catch (err) {
    //         console.log(err)
    //     } finally {
    //     }
    // }

    useEffect(() => {
        console.log('playlist list : ', googleAccountData)

        getYoutubePlaylists(googleAccountData.accessToken).then((data) => {
            console.log('data : ', data)
        })

        // let playlist = getYoutubePlaylists(googleAccountData.accessToken)
        // console.log('playlist', playlist)

        // loadAllCurrentUserPlaylist(youtubeApiUrl, googleAccountData)
    }, [googleAccountData])

    return <div>Mes playlist</div>
}

export default PlaylistList
