import { useContext, useEffect, useState } from 'react'
import { getYoutubePlaylistsItems } from '../../utils/api'
import { UserDataContext } from '../../utils/context/userData/index'
import { useParams } from 'react-router-dom'

import Content from '../../components/Playlist/Content/index'

function PlaylistContent() {
    const { state } = useContext(UserDataContext)
    const [playlistsListItems, setPlaylistsListItems] = useState(null)
    const { playlistId } = useParams<{ playlistId: string }>()

    useEffect(() => {
        console.log('playlistId : ', playlistId)
        getYoutubePlaylistsItems(state.accessToken, playlistId).then((items) => {
            console.log('setPlaylistsListItems', items)
            setPlaylistsListItems(items)
        })
    }, [state, playlistId])

    return (
        <div>
            {!playlistsListItems && <div>Rien</div>}
            {playlistsListItems && <Content playlistsListItems={playlistsListItems} />}
        </div>
    )
}

export default PlaylistContent
