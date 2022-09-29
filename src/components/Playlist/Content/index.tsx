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
} from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined'

import '../styles.css'
import { deleteItemFromPlaylist, insertItemToPlaylist } from '../../../utils/api'
import { useState } from 'react'
import { IResourceId } from '../../../utils/api/interface'
import { IPlaylistItemsContent, IPlaylistsListItems } from '../../../utils/context/interface'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUserAccessToken } from '../../../utils/arms/user/selectors'
import { ContentsInterface } from '../../../utils/arms/playlistContents/state'
import ConfirmActionDialog from '../../Dialog/ConfirmActionDialog'
import { removeContent } from '../../../utils/arms/playlistContents/reducer'
import SelectPlaylistDialog from '../../Dialog/SelectPlaylistDialog'
// import {
//     displayConfirmActionDialog,
//     displaySelectPlaylistDialog,
//     displaySnackbar,
// } from '../../../utils/arms/global/reducer'
// import { selectSelectPlaylistDialogMode } from '../../../utils/arms/global/selectors'

const defaultItemResourceId = {
    kind: '',
    videoId: '',
}

const SAVE_IN = "saveIn";
const MOVE_TO = "moveTo";

function Content({ playlistId, playlistsListItems }: { playlistId: string; playlistsListItems: ContentsInterface }) {
    const dispatch = useAppDispatch()

    const userAccessToken = useAppSelector(selectUserAccessToken)
    // const selectPlaylistDialogMode = useAppSelector(selectSelectPlaylistDialogMode)

    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorCurrentIemResourceId, setAnchorCurrentIemResourceId] = useState(defaultItemResourceId)
    const [anchorCurrentItemId, setAnchorCurrentItemId] = useState('')

    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
    const [confirmDialogContent, setConfirmDialogContent] = useState('')
    const [confirmDialogOnConfirm, setConfirmDialogOnConfirm] = useState<Function>(() => {})
    const [confirmDialogOnCancel, setConfirmDialogOnCancel] = useState<Function>(() => {})

    const [confirmDialogSnackbarVisible, setConfirmDialogSnackbarVisible] = useState(false)
    const [confirmDialogSnackbarMessage, setConfirmDialogSnackbarMessage] = useState('')
    const [confirmDialogSnackbarOnClose, setConfirmDialogSnackbarOnClose] = useState<Function>(() => {})

    const [selectPlaylistDialogVisible, setSelectPlaylistDialogVisible] = useState(false);
    const [selectPlaylistDialogMode, setSelectPlaylistDialogMode] = useState('');
    const [selectPlaylistDialogTitle, setSelectPlaylistDialogTitle] = useState('');
    const [selectPlaylistDialogConfirm, setSelectPlaylistDialogConfirm] = useState('');
    const [selectPlaylistDialogConfirmIcon, setSelectPlaylistDialogConfirmIcon] = useState(<></>);

    const resetConfirmDialogStates = () => {
        setConfirmDialogVisible(false)
        setConfirmDialogContent('')
        setConfirmDialogOnConfirm(() => {})
        setConfirmDialogOnCancel(() => {})
    }

    const handleDeleteClick = (itemId: string) => {
        setConfirmDialogContent('Etes-vous sûr de vouloir supprimer cette vidéo de votre playlist ?')
        setConfirmDialogOnCancel(() => resetConfirmDialogStates)
        setConfirmDialogOnConfirm(() => () => executeDeleteClick(itemId))
        setConfirmDialogVisible(true)
    }

    const executeDeleteClick = (itemId: string) => {
        deleteItemFromPlaylist(userAccessToken, itemId).then(() => {
            dispatch(removeContent({ id: itemId }))
            resetConfirmDialogStates()

            setConfirmDialogSnackbarOnClose(() => () => setConfirmDialogSnackbarVisible(false))
            setConfirmDialogSnackbarMessage('La vidéo a été supprimé de votre playlist avec succès')
            setConfirmDialogSnackbarVisible(true)
        })
    }

    const resetSelectPlaylistDialogStates = () => {
        setSelectPlaylistDialogVisible(false)
        setSelectPlaylistDialogMode('')
        setSelectPlaylistDialogTitle('')
        setSelectPlaylistDialogConfirm('')
        setSelectPlaylistDialogConfirmIcon(<></>)

        handleCloseMoreMenu()
    }

    const handleMoreMenu = (event: any, resourceId: IResourceId, itemId: string) => {
        setAnchorEl(event.currentTarget)
        setAnchorCurrentIemResourceId(resourceId)
        setAnchorCurrentItemId(itemId)
    }

    const handleCloseMoreMenu = () => {
        setAnchorEl(null)
        setAnchorCurrentIemResourceId(defaultItemResourceId)
        setAnchorCurrentItemId('')
    }

    const handleSaveSelectDialog = async (selectedPlaylistId: string) => {
        console.log("--- handleSaveSelectDialog ---");

        try {
            if (selectPlaylistDialogMode === SAVE_IN) {
                // await dispatch(
                //     insertItemToPlaylistAction(
                //         {
                //             userAccessToken: userAccessToken,
                //             itemResourceId: anchorCurrentIemResourceId,
                //             playlistId: selectedPlaylistId
                //         }
                //     )
                // )
                //Todo: Snackbar
            } else if (selectPlaylistDialogMode === MOVE_TO) {
                // await dispatch()
            }
        } catch {
            //Todo: Snackbar
            console.log("An error occured ...");
        }


        // if (selectPlaylistDialogMode === 'saveIn') {
        //     insertItemToPlaylist(userAccessToken, anchorCurrentIemResourceId, selectedPlaylistId).then(() => {
        //         dispatch(
        //             displaySnackbar({
        //                 snackbarSeverity: 'success',
        //                 snackbarContent: 'La vidéo a été ajouté à votre playlist avec succès',
        //             })
        //         )
        //     })
        // } else if (selectPlaylistDialogMode === 'moveTo') {
        //     insertItemToPlaylist(userAccessToken, anchorCurrentIemResourceId, selectedPlaylistId).then(() => {
        //         deleteItemFromPlaylist(userAccessToken, anchorCurrentItemId).then(() => {
        //             let newPlaylistsListItems = {
        //                 items: playlistsListItems.items.filter(function (item) {
        //                     return item.id !== anchorCurrentItemId
        //                 }),
        //             }

        //             setPlaylistsListItems(newPlaylistsListItems)

        //             dispatch(
        //                 displaySnackbar({
        //                     snackbarSeverity: 'success',
        //                     snackbarContent: 'La vidéo a été déplacé avec succès',
        //                 })
        //             )
        //         })
        //     })
        // }

        handleCloseMoreMenu()
    }

    const handleOpenSelectPlaylistDialog = (mode: string) => {
        setSelectPlaylistDialogMode(mode)

        switch (mode) {
            case SAVE_IN:
                setSelectPlaylistDialogTitle("Enregistrer dans :");
                setSelectPlaylistDialogConfirm("Enregistrer");
                setSelectPlaylistDialogConfirmIcon(<SaveOutlinedIcon />)
                break;
            case MOVE_TO:
                setSelectPlaylistDialogTitle("Déplacer vers :");
                setSelectPlaylistDialogConfirm("Déplacer");
                setSelectPlaylistDialogConfirmIcon(<SendAndArchiveOutlinedIcon />);
                break;
        }

        setSelectPlaylistDialogVisible(true)

        // dispatch(
        //     displaySelectPlaylistDialog({
        //         selectPlaylistDialogHideCurrentPlaylist: true,
        //         selectPlaylistDialogMode: mode,
        //         currentPlaylistId: playlistId,
        //         selectPlaylistDialogOnClose: handleCloseSelectDialog,
        //         selectPlaylistDialogOnSave: handleSaveSelectDialog,
        //     })
        // )
    }

    const getThumbnailsFromItem = (Item: IPlaylistItemsContent): string => {
        let pathOrUrlOfThumbnails = ''

        if (Item.snippet.thumbnails !== undefined) {
            if (Item.snippet.thumbnails.high !== undefined) {
                pathOrUrlOfThumbnails = Item.snippet.thumbnails.high.url
            }
        }

        return pathOrUrlOfThumbnails
    }

    return (
        <>
            <List className="list-container">
                {Object.values(playlistsListItems.items).map((Item, index) => (
                    <div className="item" key={Item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{ width: 120, height: 85 }}
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
                                    onClick={(event) => handleMoreMenu(event, Item.snippet.resourceId, Item.id)}
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
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                snackbarVisible={confirmDialogSnackbarVisible}
                snackbarMessage={confirmDialogSnackbarMessage}
                snackbarOnClose={confirmDialogSnackbarOnClose}
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
    )
}

export default Content
