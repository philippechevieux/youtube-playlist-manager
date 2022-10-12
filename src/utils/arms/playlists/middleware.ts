import {AppDispatch} from '../../../app/store';
import {updatePlaylistData} from '../../api';
import {IApiUpdatePlaylistParams} from '../../api/interface';
import {updatePlaylist} from './reducer';

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
