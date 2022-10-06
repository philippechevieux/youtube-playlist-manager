import {Dialog, DialogTitle, DialogActions, Button, DialogContent} from '@mui/material';

import './styles.css';
import {ReactElement, useCallback, useEffect, useState} from 'react';
import {getYoutubePlaylists} from './../../../utils/api/index';
import ListMode from './../../Playlist/ListMode/index';
import {ItemsInterface} from '../../../utils/arms/playlists/state';
import {LoadingButton} from '@mui/lab';

function SelectPlaylistDialog({
    visible,
    userAccessToken,
    currentPlaylistId = '',
    hideCurrentPlaylist = false,
    title = 'Selection',
    confirmText = 'Confimer',
    confirmIcon,
    onConfirm,
    onCancel
}: {
    visible: boolean;
    userAccessToken: string;
    currentPlaylistId?: string;
    hideCurrentPlaylist?: boolean;
    title?: string;
    confirmText?: string;
    confirmIcon?: ReactElement;
    onConfirm: Function;
    onCancel: Function;
}) {
    const [playlistsListData, setPlaylistsListData] = useState<ItemsInterface>({items: []});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nextPageToken, setNextPageToken] = useState('');
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [canSave, setCanSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const onSave = () => {
        setIsSaving(true);
        setCanSave(false);
        onConfirm(selectedPlaylistId);
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
                        mode="selectPlaylist"
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
                            Voir plus ...
                        </Button>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCancel()}>Fermer</Button>
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
}

export default SelectPlaylistDialog;
