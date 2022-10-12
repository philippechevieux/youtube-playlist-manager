import {AppDispatch} from '../../../app/store';
import {deleteItemFromPlaylist, insertItemToPlaylist} from '../../api';
import {removeContent} from './reducer';
import {ResourceIdInterface} from './state';

export const deleteItemFromPlaylistAction = (payload: {userAccessToken: string; itemId: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            await deleteItemFromPlaylist(payload.userAccessToken, payload.itemId);
            dispatch(removeContent({id: payload.itemId}));
        } catch (e) {
            console.error(`Error while deleting item (${payload.itemId})`);
            throw e;
        }
    };
};

export const insertItemToPlaylistAction = (payload: {
    userAccessToken: string;
    itemResourceId: ResourceIdInterface;
    playlistId: string;
}) => {
    return async () => {
        try {
            await insertItemToPlaylist(payload.userAccessToken, payload.itemResourceId, payload.playlistId);
        } catch (e) {
            console.error(
                `Error while inserting item (${payload.itemResourceId.videoId}) to playlist (${payload.playlistId})`
            );
            throw e;
        }
    };
};

export const moveItemToPlaylistAction = (payload: {
    userAccessToken: string;
    itemResourceId: ResourceIdInterface;
    itemId: string;
    playlistId: string;
}) => {
    return async (dispatch: AppDispatch) => {
        try {
            await Promise.all([
                insertItemToPlaylist(payload.userAccessToken, payload.itemResourceId, payload.playlistId),
                deleteItemFromPlaylist(payload.userAccessToken, payload.itemId)
            ]);
            dispatch(removeContent({id: payload.itemId}));
        } catch (e) {
            console.error(`Error while moving item (${payload.itemId}) to playlist (${payload.playlistId})`);
            throw e;
        }
    };
};
