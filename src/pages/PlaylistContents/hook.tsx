import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getYoutubePlaylistsItems} from '../../utils/api';
import {addPlaylistContents} from '../../utils/arms/playlistContents/reducer';
import {
    selectPlaylistContentsItems,
    selectPlaylistContentsNextPageToken
} from '../../utils/arms/playlistContents/selectors';

export const useFetchPlaylistContents = (
    userAccessToken: string,
    playlistId: string,
    nextPageToken: string | undefined
) => {
    const [arePlaylistContentsLoading, setArePlaylistContentsLoading] = useState(false);
    const [arePlaylistContentsLoaded, setArePlaylistContentsLoaded] = useState(false);
    const dispatch = useAppDispatch();

    const nextPageTokenInStore = useAppSelector(state => selectPlaylistContentsNextPageToken(state, playlistId));
    const playlistContents = useAppSelector(state => selectPlaylistContentsItems(state, playlistId));

    useEffect(() => {
        setArePlaylistContentsLoading(true);
        setArePlaylistContentsLoaded(false);

        console.log('----------------');
        console.log('nextPageToken : ', nextPageToken);
        console.log('nextPageTokenInStore : ', nextPageTokenInStore);
        console.log('playlistContents.length : ', playlistContents.length);

        const c1 = nextPageToken !== undefined && nextPageToken !== nextPageTokenInStore && playlistContents.length > 0;
        const c2 = playlistContents.length === 0;

        console.log('c1 : ', c1);
        console.log('c2 : ', c2);

        // TODO: fix le dernier bug sur ce sujet (double render au début 50 -> 100 à la place de 50)

        if ((nextPageToken !== undefined && nextPageToken === nextPageTokenInStore) || playlistContents.length === 0) {
            console.log('-> getYoutubePlaylistsItems');
            getYoutubePlaylistsItems(userAccessToken, playlistId, nextPageToken).then(data => {
                dispatch(addPlaylistContents({playlistId: playlistId, playListContentsData: data}));
                setArePlaylistContentsLoading(false);
                setArePlaylistContentsLoaded(true);
            });
        }
    }, [dispatch, userAccessToken, playlistId, nextPageToken, playlistContents, nextPageTokenInStore]);

    return {arePlaylistContentsLoading, arePlaylistContentsLoaded};
};
