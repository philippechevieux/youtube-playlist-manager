import {AlertColor} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {useState} from 'react';
import {IApiUpdatePlaylistParams} from '../../../utils/api/interface';
import {createPlaylistAction} from '../../../utils/arms/playlists/middleware';
import {useTranslation} from 'react-i18next';
import CrudPlaylistDialog, {crudPlaylistMode} from '../../../components/Dialog/CrudPlaylistDialog';
import {privacyStatusEnum} from '../../../utils/arms/playlists/state';

function CreatePlaylistDialog({visible = false, onCancel}: {visible: boolean; onCancel: Function}) {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const userAccessToken = useAppSelector(selectUserAccessToken);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>();
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onSave = async (title: string, description: string, status: privacyStatusEnum) => {
        try {
            const dataToSave: IApiUpdatePlaylistParams = {
                title: title,
                description: description,
                privacyStatus: status
            };

            await dispatch(
                createPlaylistAction({
                    userAccessToken: userAccessToken,
                    data: dataToSave
                })
            );

            onCancel();
            setSnackbarMessage(t('playlist created success'));
            setSnackbarSeverity('success');
            setSnackbarVisible(true);
        } catch {
            onCancel();
            setSnackbarMessage(t('playlist created error'));
            setSnackbarSeverity('error');
            setSnackbarVisible(true);
        }
    };

    return (
        <CrudPlaylistDialog
            visible={visible}
            mode={crudPlaylistMode.CREATE}
            onCrud={onSave}
            onCancel={onCancel}
            snackbarVisible={snackbarVisible}
            snackbarSeverity={snackbarSeverity}
            snackbarMessage={snackbarMessage}
            onCloseSnackBar={setSnackbarVisible}
        />
    );
}

export default CreatePlaylistDialog;
