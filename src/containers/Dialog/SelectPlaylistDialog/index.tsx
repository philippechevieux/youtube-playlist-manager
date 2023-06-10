import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@mui/material';

import './styles.css';
import {ReactElement, useCallback, useEffect, useState} from 'react';
import {getYoutubePlaylists} from '../../../utils/api/index';
import {ItemsInterface} from '../../../utils/arms/playlists/state';
import {LoadingButton} from '@mui/lab';
import {useTranslation} from 'react-i18next';
import ListMode from '../../../components/Playlists/ListMode';
import {DisplayListModeEnum} from '../../../components/Playlists/ListMode/enums';

interface SelectPlaylistDialogProps {
    visible: boolean;
    userAccessToken: string;
    currentPlaylistId?: string;
    hideCurrentPlaylist?: boolean;
    title?: string;
    confirmText?: string;
    confirmIcon?: ReactElement;
    onConfirm: Function;
    onCancel: Function;
}

const SelectPlaylistDialog: React.FC<SelectPlaylistDialogProps> = ({
    visible,
    userAccessToken,
    currentPlaylistId = '',
    hideCurrentPlaylist = false,
    title = '',
    confirmText = '',
    confirmIcon,
    onConfirm,
    onCancel
}) => {
    const {t} = useTranslation();
    const [playlistsListData, setPlaylistsListData] = useState<ItemsInterface>({items: []});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nextPageToken, setNextPageToken] = useState('');
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [canSave, setCanSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (title === '') {
        title = t('selection');
    }

    if (confirmText === '') {
        confirmText = t('confirm');
    }

    const executeOnCancel = () => {
        setCanSave(false);
        setIsSaving(false);
        onCancel();
    };

    const onSave = async () => {
        setIsSaving(true);
        setCanSave(false);
        await onConfirm(selectedPlaylistId);
        setIsSaving(false);
        setCanSave(false);
    };

    const loadPlaylistsList = useCallback(() => {
        if (!isLoaded && !isLoading && visible) {
            setIsLoading(true);
            getYoutubePlaylists(userAccessToken, nextPageToken).then(data => {
                setIsLoading(false);
                setIsLoaded(true);
                let newItems = [...playlistsListData.items, ...data.items];
                if (hideCurrentPlaylist && currentPlaylistId !== '') {
                    newItems = newItems.filter(item => {
                        return item.id !== currentPlaylistId;
                    });
                }
                data.items = newItems;
                setPlaylistsListData(data);
                setNextPageToken(data.nextPageToken);
            });
        }
    }, [
        userAccessToken,
        currentPlaylistId,
        visible,
        hideCurrentPlaylist,
        nextPageToken,
        isLoading,
        isLoaded,
        playlistsListData
    ]);

    const loadMorePlaylistList = () => {
        setIsLoaded(false);
        loadPlaylistsList();
    };

    useEffect(() => {
        loadPlaylistsList();
    }, [loadPlaylistsList]);

    return (
        <Dialog className="dialog-select-playlist" open={visible} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {playlistsListData && (
                    <ListMode
                        playlistsListData={playlistsListData}
                        setCanExecuteAfterSelect={setCanSave}
                        setSelectedPlaylistId={setSelectedPlaylistId}
                        mode={DisplayListModeEnum.SELECTION}
                    />
                )}
                {!isLoading && nextPageToken !== undefined && (
                    <div className="see-more-container">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                loadMorePlaylistList();
                            }}
                        >
                            {t('see more')} ...
                        </Button>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => executeOnCancel()}>{t('close')}</Button>
                <LoadingButton
                    loading={isSaving}
                    disabled={!canSave}
                    variant="contained"
                    color="secondary"
                    startIcon={confirmIcon}
                    onClick={onSave}
                >
                    {confirmText}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default SelectPlaylistDialog;
