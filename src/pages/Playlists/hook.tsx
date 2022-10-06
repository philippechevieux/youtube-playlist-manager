import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {getYoutubePlaylists} from '../../utils/api';
import {addPlaylists} from '../../utils/arms/playlists/reducer';

export const useFetchPlaylists = (userAccessToken: string, nextPageToken: string | undefined) => {
    const [arePlaylistsLoading, setArePlaylistsLoading] = useState(false);
    const [arePlaylistsLoaded, setArePlaylistsLoaded] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setArePlaylistsLoaded(false);
        setArePlaylistsLoading(true);

        getYoutubePlaylists(userAccessToken, nextPageToken).then(data => {
            dispatch(addPlaylists({playlistsData: data}));

            setArePlaylistsLoaded(true);
            setArePlaylistsLoading(false);
        });
    }, [dispatch, userAccessToken, nextPageToken]);

    return {arePlaylistsLoading, arePlaylistsLoaded};
};
