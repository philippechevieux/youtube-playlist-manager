import {useEffect, useState} from 'react';
import {getYoutubeVideoData} from '../../utils/api';
import {ItemInterface} from '../../utils/arms/playlistContents/state';

export const useFetchVideoData = (userAccessToken: string, playerVideoId: string | undefined) => {
    const [areVideoDataLoading, setAreVideoDataLoading] = useState(false);
    const [areVideoDataLoaded, setAreVideoDataLoaded] = useState(false);
    const [videoData, setVideoData] = useState<ItemInterface | undefined>();

    useEffect(() => {
        setAreVideoDataLoading(true);
        setAreVideoDataLoaded(false);

        if (playerVideoId) {
            getYoutubeVideoData(userAccessToken, playerVideoId).then(data => {
                if (data.items[0]) {
                    setVideoData(data.items[0]);
                }

                setAreVideoDataLoading(false);
                setAreVideoDataLoaded(true);
            });
        }
    }, [userAccessToken, playerVideoId]);

    return {areVideoDataLoading, areVideoDataLoaded, videoData};
};
