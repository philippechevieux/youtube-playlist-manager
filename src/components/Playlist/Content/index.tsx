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
    AlertColor
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined';

import '../styles.css';
import {useState} from 'react';
import {IResourceId} from '../../../utils/api/interface';
import {IPlaylistItemsContent} from '../../../utils/context/interface';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUserAccessToken} from '../../../utils/arms/user/selectors';
import {
    ContentsInterface,
    defaultItemResourceId,
    ResourceIdInterface
} from '../../../utils/arms/playlistContents/state';
import ConfirmActionDialog from '../../Dialog/ConfirmActionDialog';
import SelectPlaylistDialog from '../../Dialog/SelectPlaylistDialog';
import {
    deleteItemFromPlaylistAction,
    insertItemToPlaylistAction,
    moveItemToPlaylistAction
} from '../../../utils/arms/playlistContents/middleware';
import {MOVE_TO, SAVE_IN} from '../../../utils/constants';

function Content({playlistId, playlistsListItems}: {playlistId: string; playlistsListItems: ContentsInterface}) {
    const dispatch = useAppDispatch();

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
    const [selectPlaylistDialogMode, setSelectPlaylistDialogMode] = useState('');
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
        setConfirmDialogContent('Etes-vous sûr de vouloir supprimer cette vidéo de votre playlist ?');
        setConfirmDialogOnCancel(() => resetConfirmDialogStates);
        setConfirmDialogOnConfirm(() => () => executeDeleteClick(itemId));
        setConfirmDialogVisible(true);
    };

    const executeDeleteClick = async (itemId: string) => {
        try {
            await dispatch(deleteItemFromPlaylistAction({userAccessToken: userAccessToken, itemId: itemId}));
            resetConfirmDialogStates();

            setSnackbarMessage('La vidéo a été supprimé de votre playlist avec succès');
            setSnackbarSeverity('success');
            setSnackbarVisible(true);
        } catch {
            setSnackbarMessage('Une erreur est survenue lors de la suppression');
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
            if (selectPlaylistDialogMode === SAVE_IN) {
                await dispatch(
                    insertItemToPlaylistAction({
                        userAccessToken: userAccessToken,
                        itemResourceId: anchorCurrentIemResourceId,
                        playlistId: selectedPlaylistId
                    })
                );

                setSnackbarMessage('La vidéo a été ajouté à votre playlist avec succès');
                setSnackbarSeverity('success');
                setSnackbarVisible(true);
                resetSelectPlaylistDialogStates();
            } else if (selectPlaylistDialogMode === MOVE_TO) {
                await dispatch(
                    moveItemToPlaylistAction({
                        userAccessToken: userAccessToken,
                        itemResourceId: anchorCurrentIemResourceId,
                        itemId: anchorCurrentItemId,
                        playlistId: selectedPlaylistId
                    })
                );

                setSnackbarMessage('La vidéo a été déplacé avec succès');
                setSnackbarSeverity('success');
                setSnackbarVisible(true);
                resetSelectPlaylistDialogStates();
            }
        } catch {
            setSnackbarMessage("Une erreur est survenue lors de l'enregistrement");
            setSnackbarSeverity('error');
            setSnackbarVisible(true);
            resetSelectPlaylistDialogStates();
        }

        handleCloseMoreMenu();
    };

    const handleOpenSelectPlaylistDialog = (mode: string) => {
        setSelectPlaylistDialogMode(mode);

        switch (mode) {
            case SAVE_IN:
                setSelectPlaylistDialogTitle('Enregistrer dans :');
                setSelectPlaylistDialogConfirm('Enregistrer');
                setSelectPlaylistDialogConfirmIcon(<SaveOutlinedIcon />);
                break;
            case MOVE_TO:
                setSelectPlaylistDialogTitle('Déplacer vers :');
                setSelectPlaylistDialogConfirm('Déplacer');
                setSelectPlaylistDialogConfirmIcon(<SendAndArchiveOutlinedIcon />);
                break;
        }

        setSelectPlaylistDialogVisible(true);
    };

    const getThumbnailsFromItem = (Item: IPlaylistItemsContent): string => {
        let pathOrUrlOfThumbnails = '';

        if (Item.snippet.thumbnails !== undefined) {
            if (Item.snippet.thumbnails.high !== undefined) {
                pathOrUrlOfThumbnails = Item.snippet.thumbnails.high.url;
            }
        }

        return pathOrUrlOfThumbnails;
    };

    return (
        <>
            <List className="list-container">
                {Object.values(playlistsListItems.items).map((Item, index) => (
                    <div className="item" key={Item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{width: 120, height: 85}}
                                    alt={Item.snippet.title}
                                    src={getThumbnailsFromItem(Item)}
                                    variant="square"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                className="list-item-text list-item-text-margin"
                                primary={
                                    <Typography className="primary" variant="h6" color="text.primary">
                                        {Item.snippet.title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography className="secondary" variant="body2" color="text.secondary">
                                        {Item.snippet.videoOwnerChannelTitle}
                                    </Typography>
                                }
                            />
                            <Tooltip title="Supprimer">
                                <IconButton
                                    size="large"
                                    aria-haspopup="true"
                                    onClick={() => handleDeleteClick(Item.id)}
                                >
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Autres actions">
                                <IconButton
                                    size="large"
                                    aria-haspopup="true"
                                    aria-controls="menu-more"
                                    onClick={event => handleMoreMenu(event, Item.snippet.resourceId, Item.id)}
                                >
                                    <MoreVertOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItem>

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
                <MenuItem key="saveInAnOtherPlaylist" onClick={() => handleOpenSelectPlaylistDialog(SAVE_IN)}>
                    <SaveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Enregistrer dans une autre playlist</span>
                </MenuItem>
                <Divider />
                <MenuItem key="deleteAndSaveInAnOtherPlaylist" onClick={() => handleOpenSelectPlaylistDialog(MOVE_TO)}>
                    <SendAndArchiveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Déplacer vers une autre playlist</span>
                </MenuItem>
            </Menu>
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
