import {useState} from 'react';

import {AppBar, Toolbar, IconButton, Button, Box, Typography, Tooltip, CircularProgress} from '@mui/material';

import './styles.css';

import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUserAccessToken, selectUserPlaylistDisplayMode} from '../../utils/arms/user/selectors';
import {useFetchPlaylists} from './hook';
import {
    selectPlaylistsCurrentPageToken,
    selectPlaylistsItems,
    selectPlaylistsNextPageToken
} from '../../utils/arms/playlists/selectors';
import EditPlaylistDialog from '../../containers/Dialog/EditPlaylistDialog';
import EmptyIllustration from '../../components/Assets/EmptyIllustration';
import {PlaylistDisplayModeEnum} from '../../utils/arms/user/state';
import {setUserPlaylistDisplayMode} from '../../utils/arms/user/reducer';
import {useTranslation} from 'react-i18next';
import MosaicMode from '../../components/Playlists/MosaicMode';
import ListMode from '../../components/Playlists/ListMode';
import MosaicModeSkeleton from '../../components/Playlists/MosaicMode/Skeleton';
import {AddOutlined} from '@material-ui/icons';
import CreatePlaylistDialog from '../../containers/Dialog/CreatePlaylistDialog';

const PlaylistList: React.FC = () => {
    let history = useHistory();

    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const userAccessToken = useAppSelector(selectUserAccessToken);
    const nextPageTokenInStore = useAppSelector(selectPlaylistsNextPageToken);
    const currentPageToken = useAppSelector(selectPlaylistsCurrentPageToken);
    const playlistsItems = useAppSelector(selectPlaylistsItems);
    const userPlaylistDisplayMode = useAppSelector(selectUserPlaylistDisplayMode);

    const [isEditPlaylistDialogOpen, setIsEditPlaylistDialogOpen] = useState(false);
    const [isCreatePlaylistDialogOpen, setIsCreatePlaylistDialogOpen] = useState(false);
    const [playlistIdToEdit, setPlaylistIdToEdit] = useState<string | undefined>();
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(currentPageToken);

    const {arePlaylistsLoading} = useFetchPlaylists(userAccessToken, nextPageToken);

    const handlePlaylistDisplayMode = (mode: PlaylistDisplayModeEnum) => {
        if (mode !== userPlaylistDisplayMode) {
            dispatch(setUserPlaylistDisplayMode({playlistDisplayMode: mode}));
        }
    };

    const openPlaylist = (playlistId: string) => {
        history.push('/playlist/' + playlistId);
    };

    const openEditPlaylistDialog = (playlistId: string) => {
        setPlaylistIdToEdit(playlistId);
        setIsEditPlaylistDialogOpen(true);
    };

    const loadMorePlaylistList = () => {
        setNextPageToken(nextPageTokenInStore);
    };

    const displayPlaylists = () => {
        if (playlistsItems.length === 0) {
            if (arePlaylistsLoading) {
                return <MosaicModeSkeleton />;
            }

            return <EmptyIllustration title={t('no playlist found')} />;
        }

        if (userPlaylistDisplayMode === PlaylistDisplayModeEnum.MOSAIC) {
            return (
                <MosaicMode
                    playlistsListData={{items: playlistsItems}}
                    onClickOnEditPlaylist={openEditPlaylistDialog}
                    onClickOnOpenPlaylist={openPlaylist}
                />
            );
        } else if (userPlaylistDisplayMode === PlaylistDisplayModeEnum.LIST) {
            return (
                <ListMode
                    playlistsListData={{items: playlistsItems}}
                    onClickOnEditPlaylist={openEditPlaylistDialog}
                    onClickOnOpenPlaylist={openPlaylist}
                />
            );
        }
    };

    return (
        <div className="playlist-list">
            <AppBar position="static">
                <Box sx={{flexGrow: 1}}>
                    <Toolbar>
                        <Button
                            startIcon={<AddOutlined />}
                            variant="text"
                            onClick={() => setIsCreatePlaylistDialogOpen(true)}
                        >
                            {t('create playlist')}
                        </Button>
                        <Box sx={{flexGrow: 1}} />
                        <Typography variant="body1">{t('display')}</Typography>
                        <Tooltip title={t('mosaic')}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handlePlaylistDisplayMode(PlaylistDisplayModeEnum.MOSAIC)}
                                color={
                                    userPlaylistDisplayMode === PlaylistDisplayModeEnum.MOSAIC ? 'secondary' : 'inherit'
                                }
                            >
                                <ViewModuleOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('list')}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handlePlaylistDisplayMode(PlaylistDisplayModeEnum.LIST)}
                                color={
                                    userPlaylistDisplayMode === PlaylistDisplayModeEnum.LIST ? 'secondary' : 'inherit'
                                }
                            >
                                <ListOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </Box>
            </AppBar>

            {displayPlaylists()}

            {playlistsItems.length > 0 && nextPageTokenInStore !== undefined && (
                <div className="see-more-container">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            loadMorePlaylistList();
                        }}
                    >
                        {arePlaylistsLoading && <CircularProgress size={15} />}
                        {t('see more')} ...
                    </Button>
                </div>
            )}
            {playlistIdToEdit !== undefined && (
                <EditPlaylistDialog
                    visible={isEditPlaylistDialogOpen}
                    playlistId={playlistIdToEdit}
                    onCancel={() => setIsEditPlaylistDialogOpen(false)}
                />
            )}

            <CreatePlaylistDialog
                visible={isCreatePlaylistDialogOpen}
                onCancel={() => setIsCreatePlaylistDialogOpen(false)}
            />
        </div>
    );
};

export default PlaylistList;
