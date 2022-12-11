import {AlertColor} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {useState} from 'react';
import {selectPlaylistItem} from '../../../utils/arms/playlists/selectors';
import {IApiUpdatePlaylistParams} from '../../../utils/api/interface';
import {updatePlaylistDataAction} from '../../../utils/arms/playlists/middleware';
import {useTranslation} from 'react-i18next';
import CrudPlaylistDialog, {crudPlaylistMode} from '../../../components/Dialog/CrudPlaylistDialog';

function EditPlaylistDialog({
    visible = false,
    playlistId,
    onCancel
}: {
    visible: boolean;
    playlistId: string | undefined;
    onCancel: Function;
}) {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const playlistItem = useAppSelector(state => selectPlaylistItem(state, playlistId));

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>();
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onSave = async (title: string, description: string, status: string) => {
        if (playlistId !== undefined) {
            try {
                const dataToSave: IApiUpdatePlaylistParams = {
                    title: title,
                    description: description,
                    privacyStatus: status
                };

                await dispatch(
                    updatePlaylistDataAction({
                        userAccessToken: userAccessToken,
                        playlistId: playlistId,
                        data: dataToSave
                    })
                );

                onCancel();
                setSnackbarMessage(t('playlist data update success'));
                setSnackbarSeverity('success');
                setSnackbarVisible(true);
            } catch {
                onCancel();
                setSnackbarMessage(t('playlist data update error'));
                setSnackbarSeverity('error');
                setSnackbarVisible(true);
            }
        }
    };

    return (
        <CrudPlaylistDialog
            visible={visible}
            mode={crudPlaylistMode.UPDATE}
            playlistTitle={playlistItem.snippet.localized.title}
            playlistDescription={playlistItem.snippet.localized.description}
            playlistStatus={playlistItem.status.privacyStatus}
            onCrud={onSave}
            onCancel={onCancel}
            snackbarVisible={snackbarVisible}
            snackbarSeverity={snackbarSeverity}
            snackbarMessage={snackbarMessage}
            onCloseSnackBar={setSnackbarVisible}
        />
    );
}

export default EditPlaylistDialog;
