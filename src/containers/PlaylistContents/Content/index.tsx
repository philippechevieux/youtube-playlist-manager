import {List, Divider, Menu, MenuItem, AlertColor} from '@mui/material';

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
import {YouTubeEvent} from 'react-youtube';

enum ItemActionEnum {
    MOVE_TO = 'move_to',
    SAVE_IN = 'save_in'
}

function Content({
    player,
    isPlayerPaused,
    playerVideoId,
    playerVideoIndex,
    setPlayerVideoIndex,
    setDisplayBottomPlayer,
    currentCuePlaylistId,
    setCurrentCuePlaylistId,
    playlistId,
    playlistsListItems
}: {
    player: YouTubeEvent['target'];
    isPlayerPaused: boolean;
    playerVideoId: string;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    setDisplayBottomPlayer: Function;
    currentCuePlaylistId: string;
    setCurrentCuePlaylistId: Function;
    playlistId: string;
    playlistsListItems: ContentsInterface;
}) {
    const dispatch = useAppDispatch();

    const {t} = useTranslation();
    const userAccessToken = useAppSelector(selectUserAccessToken);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [anchorCurrentIemResourceId, setAnchorCurrentIemResourceId] =
        useState<ResourceIdInterface>(defaultItemResourceId);
    const [anchorCurrentItemId, setAnchorCurrentItemId] = useState('');

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

    const handleAvatarClick = (videoIndex: number) => {
        setPlayerVideoIndex(videoIndex);

        if (playlistId !== currentCuePlaylistId) {
            setCurrentCuePlaylistId(playlistId);
        }

        if (videoIndex !== playerVideoIndex) {
            player.playVideoAt(videoIndex);
        } else {
            isPlayerPaused ? player.playVideo() : player.pauseVideo();
        }

        setDisplayBottomPlayer(true);
    };

    return (
        <>
            <List className="list-container">
                {Object.values(playlistsListItems.items).map((Item, index) => (
                    <div key={Item.id}>
                        <VideoItem
                            Item={Item}
                            isVideoCued={playerVideoIndex === index && playerVideoId === Item.contentDetails.videoId}
                            isPlayerPaused={isPlayerPaused}
                            handleDeleteClick={handleDeleteClick}
                            handleMoreMenu={handleMoreMenu}
                            handleAvatarClick={() => handleAvatarClick(index)}
                        />

                        {index + 1 < playlistsListItems.items.length && (
                            <Divider className="divider" variant="middle" component="li" />
                        )}
                    </div>
                ))}
            </List>
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
            <ConfirmActionDialog
                visible={confirmDialogVisible}
                content={confirmDialogContent}
                onCancel={confirmDialogOnCancel}
                onConfirm={confirmDialogOnConfirm}
                snackbarVisible={snackbarVisible}
                snackbarSeverity={snackbarSeverity}
                snackbarMessage={snackbarMessage}
                onCloseSnackBar={setSnackbarVisible}
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
        </>
    );
}

export default Content;
