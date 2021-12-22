import { List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography } from '@mui/material'
import React from 'react'

import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import EditIcon from '@mui/icons-material/Edit'

import '../styles.css'

interface EnumPlaylistsListData {
    id: string
    snippet: {
        localized: {
            title: string
            description: string
        }
        thumbnails: {
            high: {
                url: string
            }
        }
    }
}

interface IPlaylistsListData {
    items: Array<EnumPlaylistsListData>
}

function ListMode({
    playlistsListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsListData
    handlePlaylistClickOnList: Function
}) {
    return (
        <List className="list-container">
            {playlistsListData.items?.map((PlaylistData) => (
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

                    <Divider className="divider" variant="middle" component="li" />
                </div>
            ))}
        </List>
    )
}

export default ListMode
