import {AppDispatch} from '../../../app/store';
import {createPlaylistItem, updatePlaylistItem, deletePlaylistItem} from '../../api';
import {IApiUpdatePlaylistParams} from '../../api/interface';
import {createPlaylist, deletePlaylist, updatePlaylist} from './reducer';

export const updatePlaylistDataAction = (payload: {
    userAccessToken: string;
    playlistId: string;
    data: IApiUpdatePlaylistParams;
}) => {
    return async (dispatch: AppDispatch) => {
        try {
            await updatePlaylistItem(payload.userAccessToken, payload.playlistId, payload.data);
            dispatch(updatePlaylist({playlistId: payload.playlistId, dataToUpdate: payload.data}));
        } catch (e) {
            console.error(`Error while updating playlist (${payload.playlistId})`);
            throw e;
        }
    };
};

export const createPlaylistAction = (payload: {userAccessToken: string; data: IApiUpdatePlaylistParams}) => {
    return async (dispatch: AppDispatch) => {
        try {
            const playlist = await createPlaylistItem(payload.userAccessToken, payload.data);
            dispatch(createPlaylist({playlist: playlist}));
        } catch (e) {
            console.error(`Error while creating playlist (${payload.data.title})`);
            throw e;
        }
    };
};

export const deletePlaylistAction = (payload: {userAccessToken: string; playlistId: string}) => {
    return async (dispatch: AppDispatch) => {
        try {
            await deletePlaylistItem(payload.userAccessToken, payload.playlistId);
            dispatch(deletePlaylist({playlistId: payload.playlistId}));
        } catch (e) {
            console.error(`Error while deleting playlist (${payload.playlistId})`);
            throw e;
        }
    };
};
