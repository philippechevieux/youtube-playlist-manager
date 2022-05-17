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
import {
    displayConfirmActionDialog,
    displaySelectPlaylistDialog,
    displaySnackbar,
} from '../../../utils/arms/global/reducer'
import { selectSelectPlaylistDialogMode } from '../../../utils/arms/global/selectors'

const defaultItemResourceId = {
    kind: '',
    videoId: '',
}

function Content({
    playlistId,
    playlistsListItems,
    setPlaylistsListItems,
}: {
    playlistId: string
    playlistsListItems: IPlaylistsListItems
    setPlaylistsListItems: Function
}) {
    const dispatch = useAppDispatch()

    const userAccessToken = useAppSelector(selectUserAccessToken)
    const selectPlaylistDialogMode = useAppSelector(selectSelectPlaylistDialogMode)

    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorCurrentIemResourceId, setAnchorCurrentIemResourceId] = useState(defaultItemResourceId)
    const [anchorCurrentItemId, setAnchorCurrentItemId] = useState('')

    const handleDeleteClick = (itemId: string) => {
        dispatch(
            displayConfirmActionDialog({
                confirmActionDialogContentMessage: 'Etes vous sur de vouloir supprimer cette vidéo ?',
                confirmActionDialogExecuteButtonLabel: 'Supprimer',
                confirmActionDialogOnExecute: () => {
                    ExecuteDeleteClick(itemId)
                },
            })
        )
    }

    const ExecuteDeleteClick = (itemId: string) => {
        let newPlaylistsListItems = {
            items: playlistsListItems.items.filter(function (item) {
                return item.id !== itemId
            }),
        }

        setPlaylistsListItems(newPlaylistsListItems)

        deleteItemFromPlaylist(userAccessToken, itemId).then(() => {
            dispatch(
                displaySnackbar({
                    snackbarSeverity: 'success',
                    snackbarContent: 'La vidéo a été supprimé de votre playlist avec succès',
                })
            )
        })
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

    const handleCloseSelectDialog = () => {
        handleCloseMoreMenu()
    }

    const handleSaveSelectDialog = (selectedPlaylistId: string) => {
        if (selectPlaylistDialogMode === 'saveIn') {
            insertItemToPlaylist(userAccessToken, anchorCurrentIemResourceId, selectedPlaylistId).then(() => {
                dispatch(
                    displaySnackbar({
                        snackbarSeverity: 'success',
                        snackbarContent: 'La vidéo a été ajouté à votre playlist avec succès',
                    })
                )
            })
        } else if (selectPlaylistDialogMode === 'moveTo') {
            insertItemToPlaylist(userAccessToken, anchorCurrentIemResourceId, selectedPlaylistId).then(() => {
                deleteItemFromPlaylist(userAccessToken, anchorCurrentItemId).then(() => {
                    let newPlaylistsListItems = {
                        items: playlistsListItems.items.filter(function (item) {
                            return item.id !== anchorCurrentItemId
                        }),
                    }

                    setPlaylistsListItems(newPlaylistsListItems)

                    dispatch(
                        displaySnackbar({
                            snackbarSeverity: 'success',
                            snackbarContent: 'La vidéo a été déplacé avec succès',
                        })
                    )
                })
            })
        }

        handleCloseMoreMenu()
    }

    const handleOpenSelectPlaylistDialog = (mode: string) => {
        dispatch(
            displaySelectPlaylistDialog({
                selectPlaylistDialogHideCurrentPlaylist: true,
                selectPlaylistDialogMode: mode,
                currentPlaylistId: playlistId,
                selectPlaylistDialogOnClose: handleCloseSelectDialog,
                selectPlaylistDialogOnSave: handleSaveSelectDialog,
            })
        )
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
                <MenuItem key="saveInAnOtherPlaylist" onClick={() => handleOpenSelectPlaylistDialog('saveIn')}>
                    <SaveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Enregistrer dans une autre playlist</span>
                </MenuItem>
                <Divider />
                <MenuItem key="deleteAndSaveInAnOtherPlaylist" onClick={() => handleOpenSelectPlaylistDialog('moveTo')}>
                    <SendAndArchiveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Déplacer vers une autre playlist</span>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Content
