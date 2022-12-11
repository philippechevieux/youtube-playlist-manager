import {AppDispatch} from '../../../app/store';
import {createPlaylistItem, updatePlaylistData} from '../../api';
import {IApiUpdatePlaylistParams} from '../../api/interface';
import {createPlaylist, updatePlaylist} from './reducer';

export const updatePlaylistDataAction = (payload: {
    userAccessToken: string;
    playlistId: string;
    data: IApiUpdatePlaylistParams;
}) => {
    return async (dispatch: AppDispatch) => {
        try {
            await updatePlaylistData(payload.userAccessToken, payload.playlistId, payload.data);
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
