import { List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography } from '@mui/material'
import React, { useContext } from 'react'

import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'

import { IPlaylistsData } from '../../../utils/context/interface'
import './styles.css'
import { DialogActionTypes } from '../../../utils/reducer'
import { UserDataContext } from './../../../utils/context/index'

function ListMode({
    playlistsListData,
    updatePlaylistListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsData
    updatePlaylistListData: Function
    handlePlaylistClickOnList: Function
}) {
    const { dispatch } = useContext(UserDataContext)

    return (
        <List className="list-container">
            {playlistsListData.items?.map((PlaylistData, index) => (
                <div className="item" key={PlaylistData.id}>
                    <ListItem
                        secondaryAction={
                            <div>
                                <IconButton
                                    className="margin"
                                    edge="end"
                                    aria-label="share"
                                    onClick={() => {
                                        dispatch({
                                            type: DialogActionTypes.DISPLAY_EDIT_PLAYLIST_DIALOG,
                                            editPlaylistDialogData: PlaylistData,
                                            editPlaylistDialogOnClose: updatePlaylistListData,
                                            editPlaylistDialogId: PlaylistData.id,
                                        })
                                    }}
                                >
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handlePlaylistClickOnList(PlaylistData.id)}
                                >
                                    <LaunchOutlinedIcon />
                                </IconButton>
                            </div>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar
                                sx={{ width: 120, height: 85 }}
                                alt={PlaylistData.snippet.localized.title}
                                src={PlaylistData.snippet.thumbnails.high.url}
                                variant="square"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            className="list-item-text list-item-text-margin"
                            primary={
                                <Typography className="primary" variant="h6" color="text.primary">
                                    {PlaylistData.snippet.localized.title}
                                </Typography>
                            }
                            secondary={
                                <Typography className="secondary" variant="body2" color="text.secondary">
                                    {PlaylistData.snippet.localized.description === ''
                                        ? 'Aucune description'
                                        : PlaylistData.snippet.localized.description}
                                </Typography>
                            }
                        />
                    </ListItem>

                    {index + 1 < playlistsListData.items.length && (
                        <Divider className="divider" variant="middle" component="li" />
                    )}
                </div>
            ))}
        </List>
    )
}

export default ListMode
