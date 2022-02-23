import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography, IconButton } from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import '../styles.css'
import { deleteItemFromPlaylist } from '../../../utils/api'
import { useContext } from 'react'
import { UserDataContext } from '../../../utils/context/userData'
import { UserDataActionTypes } from '../../../utils/reducer/userData'
import ConfirmActionDialog from '../../Dialog/ConfirmActionDialog'

interface EnumPlaylistItemsContent {
    id: string
    snippet: {
        title: string
        videoOwnerChannelTitle: string
        thumbnails: {
            high: {
                url: string
            }
        }
    }
}

export interface IPlaylistsListItems {
    items: Array<EnumPlaylistItemsContent>
}

function Content({
    playlistsListItems,
    setPlaylistsListItems,
}: {
    playlistsListItems: IPlaylistsListItems
    setPlaylistsListItems: Function
}) {
    const { dispatch, state } = useContext(UserDataContext)

    const handleDeleteClick = (itemId: string) => {
        dispatch({
            type: UserDataActionTypes.DISPLAY_CONFIRM_ACTION_DIALOG,
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
                type: UserDataActionTypes.DISPLAY_SNACK_BAR,
                snackbarSeverity: 'success',
                snackbarContent: 'La vidéo a été supprimé de votre playlist avec succès',
            })
        })
    }

    const getThumbnailsFromItem = (Item: EnumPlaylistItemsContent): string => {
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
                        {console.log(Item)}
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
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handleDeleteClick(Item.id)}
                            >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                            <IconButton size="large" aria-controls="menu-appbar" aria-haspopup="true">
                                <MoreVertOutlinedIcon />
                            </IconButton>
                        </ListItem>

                        {index + 1 < playlistsListItems.items.length && (
                            <Divider className="divider" variant="middle" component="li" />
                        )}
                    </div>
                ))}
            </List>
            <ConfirmActionDialog />
        </>
    )
}

export default Content
