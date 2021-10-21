import { useEffect, useContext } from 'react'
import { getYoutubePlaylists } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'

function PlaylistList() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)

    useEffect(() => {
        console.log('playlist list : ', googleAccountData)

        getYoutubePlaylists(googleAccountData.accessToken).then((data) => {
            console.log('data : ', data)
        })
    }, [googleAccountData])

    return <div>Mes playlist</div>
}

export default PlaylistList
