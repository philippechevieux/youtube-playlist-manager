import { List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'

import { IPlaylistsData } from '../../../utils/context/interface'
import './styles.css'

function ListMode({
    playlistsListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsData
    handlePlaylistClickOnList: Function
}) {
    return (
        <List className="list-container">
            {playlistsListData.items?.map((PlaylistData, index) => (
                <div className="item" key={PlaylistData.id}>
                    <ListItem
                        secondaryAction={
                            <div>
                                <IconButton className="margin" edge="end" aria-label="share">
                                    <ShareOutlinedIcon />
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
