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
} from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined'

import '../styles.css'
import { deleteItemFromPlaylist } from '../../../utils/api'
import { useContext, useState } from 'react'
import { defaultItemResourceId, UserDataContext } from '../../../utils/context'
import { DialogActionTypes } from '../../../utils/reducer'
import { IResourceId } from '../../../utils/api/interface'
import { IPlaylistItemsContent, IPlaylistsListItems } from '../../../utils/context/interface'

function Content({
    playlistId,
    playlistsListItems,
    setPlaylistsListItems,
}: {
    playlistId: string
    playlistsListItems: IPlaylistsListItems
    setPlaylistsListItems: Function
}) {
    const { dispatch, state } = useContext(UserDataContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorCurrentIemResourceId, setAnchorCurrentIemResourceId] = useState(defaultItemResourceId)

    const handleDeleteClick = (itemId: string) => {
        dispatch({
            type: DialogActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG,
            confirmActionDialogContentMessage: 'Etes vous sur de vouloir supprimer cette vidéo ?',
            confirmActionDialogExecuteButtonLabel: 'Supprimer',
            confirmActionDialogOnExecute: () => {
                ExecuteDeleteClick(itemId)
            },
        })
    }

    const ExecuteDeleteClick = (itemId: string) => {
        let newPlaylistsListItems = {
            items: playlistsListItems.items.filter(function (item) {
                return item.id !== itemId
            }),
        }

        setPlaylistsListItems(newPlaylistsListItems)

        deleteItemFromPlaylist(state.accessToken, itemId).then(() => {
            dispatch({
                type: DialogActionTypes.DISPLAY_SNACK_BAR,
                snackbarSeverity: 'success',
                snackbarContent: 'La vidéo a été supprimé de votre playlist avec succès',
            })
        })
    }

    const handleMoreMenu = (event: any, resourceId: IResourceId) => {
        setAnchorEl(event.currentTarget)
        setAnchorCurrentIemResourceId(resourceId)
    }

    const handleCloseMoreMenu = () => {
        setAnchorEl(null)
        setAnchorCurrentIemResourceId(defaultItemResourceId)
    }

    const handleOpenSelectPlaylistDialog = (mode: string, resourceId: IResourceId) => {
        dispatch({
            type: DialogActionTypes.DISPLAY_SELECT_PLAYLIST_DIALOG,
            selectPlaylistDialogHideCurrentPlaylist: true,
            currentPlaylistId: playlistId,
            currentResourceIdItem: resourceId,
            selectPlaylistDialogMode: mode,
            selectPlaylistDialogOnClose: handleCloseMoreMenu,
        })
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
                            <IconButton size="large" aria-haspopup="true" onClick={() => handleDeleteClick(Item.id)}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-haspopup="true"
                                aria-controls="menu-more"
                                onClick={(event) => handleMoreMenu(event, Item.snippet.resourceId)}
                            >
                                <MoreVertOutlinedIcon />
                            </IconButton>
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
                <MenuItem
                    key="saveInAnOtherPlaylist"
                    onClick={() => handleOpenSelectPlaylistDialog('saveIn', anchorCurrentIemResourceId)}
                >
                    <SaveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Enregistrer dans une autre playlist</span>
                </MenuItem>
                <Divider />
                <MenuItem
                    key="deleteAndSaveInAnOtherPlaylist"
                    onClick={() => handleOpenSelectPlaylistDialog('moveTo', anchorCurrentIemResourceId)}
                >
                    <SendAndArchiveOutlinedIcon />
                    <span className="header-menuitem-margin-left">Déplacer vers une autre playlist</span>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Content
