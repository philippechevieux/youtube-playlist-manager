import { useContext, useEffect, useState } from 'react'
import { getYoutubePlaylistsItems } from '../../utils/api'
import { GoogleAccountDataContext } from '../../utils/context/index'
import { useParams } from 'react-router-dom'

import Content from '../../components/Playlist/Content/index'

function PlaylistContent() {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)
    const [playlistsListItems, setPlaylistsListItems] = useState(null)
    const { playlistId } = useParams<{ playlistId: string }>()

    useEffect(() => {
        console.log('playlistId : ', playlistId)
        getYoutubePlaylistsItems(googleAccountData.accessToken, playlistId).then((items) => {
            console.log('setPlaylistsListItems', items)
            setPlaylistsListItems(items)
        })
    }, [googleAccountData, playlistId])

    return (
        <div>
            {!playlistsListItems && <div>Rien</div>}
            {playlistsListItems && <Content playlistsListItems={playlistsListItems} />}
        </div>
    )
}

export default PlaylistContent
