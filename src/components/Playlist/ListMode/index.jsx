import { List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

import './styles.css'

function ListMode({ playlistsListData, handlePlaylistClickOnList }) {
    return (
        <List className="list-container">
            {playlistsListData.items?.map((PlaylistData, index) => (
                <div key={PlaylistData.id}>
                    <ListItem
                        secondaryAction={
                            <div>
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handlePlaylistClickOnList(PlaylistData.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </div>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar
                                sx={{ width: 75, height: 75 }}
                                alt={PlaylistData.snippet.localized.title}
                                src={PlaylistData.snippet.thumbnails.high.url}
                                variant="rounded"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            className="list-item-text list-item-text-margin"
                            primary={
                                <Typography className="primary" variant="body1" color="text.primary">
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

                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    )
}

export default ListMode
