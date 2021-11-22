import { useContext, useEffect, useState } from 'react'
import { getYoutubePlaylistsItems } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'
import { useParams } from 'react-router-dom'

function PlaylistContent() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)
    const [playlistsListItems, setPlaylistsListItems] = useState(null)
    const { playlistId } = useParams()

    useEffect(() => {
        console.log('playlistId : ', playlistId)
        getYoutubePlaylistsItems(googleAccountData.accessToken, playlistId).then((items) => {
            console.log('setPlaylistsListItems', items)
            setPlaylistsListItems(items)
        })
    }, [googleAccountData, playlistId])

    return <div>Mon contenu</div>
}

export default PlaylistContent
