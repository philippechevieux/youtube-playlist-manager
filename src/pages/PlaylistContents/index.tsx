import {Dispatch, SetStateAction, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button, AlertColor} from '@mui/material';
import {useHistory} from 'react-router-dom';

import './styles.css';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUserAccessToken} from '../../utils/arms/user/selectors';
import {useFetchPlaylistContents} from './hook';
import {
    selectPlaylistContentsItems,
    selectPlaylistContentsNextPageToken
} from '../../utils/arms/playlistContents/selectors';
import {selectPlaylistItem} from '../../utils/arms/playlists/selectors';
import EditPlaylistDialog from '../../containers/Dialog/EditPlaylistDialog';
import EmptyIllustration from '../../components/Assets/EmptyIllustration';
import {useTranslation} from 'react-i18next';
import Content from '../../containers/PlaylistContents/Content';
import ContentSkeleton from '../../containers/PlaylistContents/Content/Skeleton';
import {ChevronLeftOutlined, DeleteOutlineOutlined, EditOutlined} from '@material-ui/icons';
import ConfirmActionDialog from '../../components/Dialog/ConfirmActionDialog';
import {deletePlaylistAction} from '../../utils/arms/playlists/middleware';
import {playerStateInterface} from '../../containers/Body/types';

interface PlaylistContentProps {
    playerState: playerStateInterface;
    setPlayerState: Dispatch<SetStateAction<playerStateInterface>>;
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({playerState, setPlayerState}) => {
    let history = useHistory();

    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {playlistId} = useParams<{playlistId: string}>();

    const playlistItem = useAppSelector(state => selectPlaylistItem(state, playlistId));
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const nextPageTokenInStore = useAppSelector(state => selectPlaylistContentsNextPageToken(state, playlistId));
    const playlistContentsItems = useAppSelector(state => selectPlaylistContentsItems(state, playlistId));

    const [isPlaylistDeleted, setIsPlaylistDeleted] = useState(false);
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
    const [isEditPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>();
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const {arePlaylistContentsLoading, arePlaylistContentsLoaded} = useFetchPlaylistContents(
        userAccessToken,
        playlistId,
        nextPageToken
    );

    const handleHomeClick = () => {
        history.push('/playlists');
    };

    const loadMorePlaylisContents = () => {
        setNextPageToken(nextPageTokenInStore);
    };

    const displayPlaylistContent = () => {
        let content, skeleton, loadMore;

        if (playlistContentsItems.length > 0) {
            content = (
                <Content
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    playlistId={playlistId}
                    playlistsListItems={{items: playlistContentsItems}}
                />
            );
        }

        if (arePlaylistContentsLoaded && playlistContentsItems.length === 0 && !isPlaylistDeleted) {
            content = <EmptyIllustration title={t('no video in your playlist')} />;
        }

        if (isPlaylistDeleted) {
            content = <EmptyIllustration title={t('playlist deleted')} />;
        }

        if (arePlaylistContentsLoading) {
            skeleton = <ContentSkeleton isFirstLoad={playlistContentsItems.length === 0} />;
        }

        if (nextPageTokenInStore !== undefined) {
            loadMore = (
                <div className="see-more-container">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            loadMorePlaylisContents();
                        }}
                    >
                        {t('see more')} ...
                    </Button>
                </div>
            );
        }

        return (
            <div>
                {content}
                {skeleton}
                {loadMore}
            </div>
        );
    };

    const confirmDeletePlaylist = async () => {
        try {
            await dispatch(
                deletePlaylistAction({
                    userAccessToken: userAccessToken,
                    playlistId: playlistId
                })
            );

            setIsPlaylistDeleted(true);
            setIsConfirmDialogOpen(false);
            setSnackbarMessage(t('playlist deleted success'));
            setSnackbarSeverity('success');
            setSnackbarVisible(true);
        } catch {
            setIsConfirmDialogOpen(false);
            setSnackbarMessage(t('playlist deleted error'));
            setSnackbarSeverity('error');
            setSnackbarVisible(true);
        }
    };

    return (
        <div className="playlist-content">
            <AppBar position="static">
                <Box sx={{flexGrow: 1}}>
                    <Toolbar>
                        <Tooltip title={t('back')}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handleHomeClick()}
                            >
                                <ChevronLeftOutlined />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="subtitle1">
                            {playlistItem && playlistItem.snippet.localized.title}
                        </Typography>
                        <Box sx={{flexGrow: 1}} />
                        {!isPlaylistDeleted && (
                            <>
                                <Tooltip title={t('edit')}>
                                    <IconButton
                                        size="large"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => {
                                            setIsPlaylistDialogOpen(true);
                                        }}
                                    >
                                        <EditOutlined />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t('delete')}>
                                    <IconButton
                                        size="large"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => setIsConfirmDialogOpen(true)}
                                    >
                                        <DeleteOutlineOutlined />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Toolbar>
                </Box>
            </AppBar>

            {displayPlaylistContent()}

            {playlistItem && (
                <EditPlaylistDialog
                    visible={isEditPlaylistDialogOpen}
                    playlistId={playlistId}
                    onCancel={() => setIsPlaylistDialogOpen(false)}
                />
            )}

            <ConfirmActionDialog
                visible={isConfirmDialogOpen}
                content={t('confirm delete playlist')}
                confirmButtonLabel={t('delete')}
                onConfirm={confirmDeletePlaylist}
                onCancel={() => setIsConfirmDialogOpen(false)}
                snackbarVisible={snackbarVisible}
                snackbarMessage={snackbarMessage}
                snackbarSeverity={snackbarSeverity}
                onCloseSnackBar={setSnackbarVisible}
            />
        </div>
    );
};

export default PlaylistContent;
