import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {getYoutubePlaylistsItems} from '../../utils/api';
import {addPlaylistContents} from '../../utils/arms/playlistContents/reducer';

export const useFetchPlaylistContents = (
    userAccessToken: string,
    playlistId: string,
    nextPageToken: string | undefined
) => {
    const [arePlaylistContentsLoading, setArePlaylistContentsLoading] = useState(false);
    const [arePlaylistContentsLoaded, setArePlaylistContentsLoaded] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setArePlaylistContentsLoading(true);
        setArePlaylistContentsLoaded(false);

        getYoutubePlaylistsItems(userAccessToken, playlistId, nextPageToken).then(data => {
            dispatch(addPlaylistContents({playlistId: playlistId, playListContentsData: data}));
            setArePlaylistContentsLoading(false);
            setArePlaylistContentsLoaded(true);
        });
    }, [dispatch, userAccessToken, playlistId, nextPageToken]);

    return {arePlaylistContentsLoading, arePlaylistContentsLoaded};
};
