import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Snackbar,
    Alert,
    AlertColor,
    Button
} from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined';

import './styles.css';
import {useState} from 'react';
import {IResourceId} from '../../../utils/api/interface';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {
    ContentsInterface,
    defaultItemResourceId,
    ResourceIdInterface
} from '../../../utils/arms/playlistContents/state';
import SelectPlaylistDialog from '../../../containers/Dialog/SelectPlaylistDialog';
import {
    deleteItemFromPlaylistAction,
    insertItemToPlaylistAction,
    moveItemToPlaylistAction
} from '../../../utils/arms/playlistContents/middleware';
import {useTranslation} from 'react-i18next';
import ConfirmActionDialog from '../../../components/Dialog/ConfirmActionDialog';
import VideoItem from '../../../components/VideoItem';
import BottomPlayer from '../../../components/BottomPlayer';
import {YouTubeEvent} from 'react-youtube';
import YoutubeIFrame from '../../../components/BottomPlayer/YoutubeIFrame';

enum ItemActionEnum {
    MOVE_TO = 'move_to',
    SAVE_IN = 'save_in'
}

function Content({
    playlistId,
    playlistsListItems,
    loadMorePlaylisContents,
    nextPageTokenInStore
}: {
    playlistId: string;
    playlistsListItems: ContentsInterface;
    loadMorePlaylisContents: Function;
    nextPageTokenInStore: string | undefined;
}) {
    const dispatch = useAppDispatch();

    const {t} = useTranslation();
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorCurrentIemResourceId, setAnchorCurrentIemResourceId] =
        useState<ResourceIdInterface>(defaultItemResourceId);
    const [anchorCurrentItemId, setAnchorCurrentItemId] = useState('');

    const [player, setPlayer] = useState<YouTubeEvent['target']>();
    const [playerVideoIndex, setPlayerVideoIndex] = useState<number | undefined>();
    const [displayBottomPlayer, setDisplayBottomPlayer] = useState(false);

    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [confirmDialogContent, setConfirmDialogContent] = useState('');
    const [confirmDialogOnConfirm, setConfirmDialogOnConfirm] = useState<Function>(() => {});
    const [confirmDialogOnCancel, setConfirmDialogOnCancel] = useState<Function>(() => {});

    const [selectPlaylistDialogVisible, setSelectPlaylistDialogVisible] = useState(false);
    const [selectPlaylistDialogMode, setSelectPlaylistDialogMode] = useState<ItemActionEnum | ''>('');
    const [selectPlaylistDialogTitle, setSelectPlaylistDialogTitle] = useState('');
    const [selectPlaylistDialogConfirm, setSelectPlaylistDialogConfirm] = useState('');
    const [selectPlaylistDialogConfirmIcon, setSelectPlaylistDialogConfirmIcon] = useState(<></>);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

    const resetConfirmDialogStates = () => {
        setConfirmDialogVisible(false);
        setConfirmDialogContent('');
        setConfirmDialogOnConfirm(() => {});
        setConfirmDialogOnCancel(() => {});
    };

    const handleDeleteClick = (itemId: string) => {
        setConfirmDialogContent(t('confirm delete video from playlist'));
        setConfirmDialogOnCancel(() => resetConfirmDialogStates);
        setConfirmDialogOnConfirm(() => () => executeDeleteClick(itemId));
        setConfirmDialogVisible(true);
    };

    const executeDeleteClick = async (itemId: string) => {
        try {
            await dispatch(deleteItemFromPlaylistAction({userAccessToken: userAccessToken, itemId: itemId}));
            resetConfirmDialogStates();

            setSnackbarMessage(t('video delete success'));
            setSnackbarSeverity('success');
            setSnackbarVisible(true);
        } catch {
            setSnackbarMessage(t('video delete error'));
            setSnackbarSeverity('error');
            setSnackbarVisible(true);
        }
    };

    const resetSelectPlaylistDialogStates = () => {
        setSelectPlaylistDialogVisible(false);
        setSelectPlaylistDialogMode('');
        setSelectPlaylistDialogTitle('');
        setSelectPlaylistDialogConfirm('');
        setSelectPlaylistDialogConfirmIcon(<></>);

        handleCloseMoreMenu();
    };

    const handleMoreMenu = (event: React.MouseEvent<HTMLButtonElement>, resourceId: IResourceId, itemId: string) => {
        setAnchorEl(event.currentTarget);
        setAnchorCurrentIemResourceId(resourceId);
        setAnchorCurrentItemId(itemId);
    };

    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
        setAnchorCurrentIemResourceId(defaultItemResourceId);
        setAnchorCurrentItemId('');
    };

    const handleSaveSelectDialog = async (selectedPlaylistId: string) => {
        try {
            if (selectPlaylistDialogMode === ItemActionEnum.SAVE_IN) {
                await dispatch(
                    insertItemToPlaylistAction({
                        userAccessToken: userAccessToken,
                        itemResourceId: anchorCurrentIemResourceId,
                        playlistId: selectedPlaylistId
                    })
                );

                setSnackbarMessage(t('video add success'));
                setSnackbarSeverity('success');
                setSnackbarVisible(true);
                resetSelectPlaylistDialogStates();
            } else if (selectPlaylistDialogMode === ItemActionEnum.MOVE_TO) {
                await dispatch(
                    moveItemToPlaylistAction({
                        userAccessToken: userAccessToken,
                        itemResourceId: anchorCurrentIemResourceId,
                        itemId: anchorCurrentItemId,
                        playlistId: selectedPlaylistId
                    })
                );

                setSnackbarMessage(t('video move success'));
                setSnackbarSeverity('success');
                setSnackbarVisible(true);
                resetSelectPlaylistDialogStates();
            }
        } catch {
            setSnackbarMessage(t('error occure while saving'));
            setSnackbarSeverity('error');
            setSnackbarVisible(true);
            resetSelectPlaylistDialogStates();
        }

        handleCloseMoreMenu();
    };

    const handleOpenSelectPlaylistDialog = (mode: ItemActionEnum) => {
        setSelectPlaylistDialogMode(mode);

        switch (mode) {
            case ItemActionEnum.SAVE_IN:
                setSelectPlaylistDialogTitle(t('save in') + ' :');
                setSelectPlaylistDialogConfirm(t('save'));
                setSelectPlaylistDialogConfirmIcon(<SaveOutlinedIcon />);
                break;
            case ItemActionEnum.MOVE_TO:
                setSelectPlaylistDialogTitle(t('move to') + ' :');
                setSelectPlaylistDialogConfirm(t('move'));
                setSelectPlaylistDialogConfirmIcon(<SendAndArchiveOutlinedIcon />);
                break;
        }

        setSelectPlaylistDialogVisible(true);
    };

    return (
        <>
            <List className="list-container">
                {Object.values(playlistsListItems.items).map((Item, index) => (
                    <div key={Item.id}>
                        <VideoItem
                            Item={Item}
                            isVideoPlaying={playerVideoIndex === index && displayBottomPlayer}
                            handleDeleteClick={handleDeleteClick}
                            handleMoreMenu={handleMoreMenu}
                            handleAvatarClick={() => {
                                setPlayerVideoIndex(index);
                                player.playVideoAt(index);
                                setDisplayBottomPlayer(true);
                            }}
                        />

                        {index + 1 < playlistsListItems.items.length && (
                            <Divider className="divider" variant="middle" component="li" />
                        )}
                    </div>
                ))}
            </List>
            {playlistsListItems.items.length > 0 && nextPageTokenInStore !== undefined && (
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
            )}
            <Menu
                id="menu-more"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                disableScrollLock={false}
                open={Boolean(anchorEl)}
                onClose={handleCloseMoreMenu}
            >
                <MenuItem
                    key="saveInAnOtherPlaylist"
                    onClick={() => handleOpenSelectPlaylistDialog(ItemActionEnum.SAVE_IN)}
                >
                    <SaveOutlinedIcon />
                    <span className="header-menuitem-margin-left">{t('save in an other playlist')}</span>
                </MenuItem>
                <Divider />
                <MenuItem
                    key="deleteAndSaveInAnOtherPlaylist"
                    onClick={() => handleOpenSelectPlaylistDialog(ItemActionEnum.MOVE_TO)}
                >
                    <SendAndArchiveOutlinedIcon />
                    <span className="header-menuitem-margin-left">{t('move to an other playlist')}</span>
                </MenuItem>
            </Menu>
            <BottomPlayer
                player={player}
                setPlayer={setPlayer}
                playlistId={playlistId}
                playerVideoIndex={playerVideoIndex}
                setPlayerVideoIndex={setPlayerVideoIndex}
                visible={displayBottomPlayer}
            />
            <ConfirmActionDialog
                visible={confirmDialogVisible}
                content={confirmDialogContent}
                onCancel={confirmDialogOnCancel}
                onConfirm={confirmDialogOnConfirm}
            />
            <SelectPlaylistDialog
                visible={selectPlaylistDialogVisible}
                currentPlaylistId={playlistId}
                userAccessToken={userAccessToken}
                hideCurrentPlaylist={true}
                title={selectPlaylistDialogTitle}
                confirmText={selectPlaylistDialogConfirm}
                confirmIcon={selectPlaylistDialogConfirmIcon}
                onConfirm={handleSaveSelectDialog}
                onCancel={resetSelectPlaylistDialogStates}
            />
            <Snackbar
                open={snackbarVisible}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                autoHideDuration={4000}
                onClose={() => setSnackbarVisible(false)}
            >
                <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </>
    );
}

export default Content;
