import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material'

import '../styles.css'

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

function Content({ playlistsListItems }: { playlistsListItems: IPlaylistsListItems }) {
    // TODO: Later execute a second request to retrieve videos duration. Maybe this request should be done in playlistlist

    return (
        <List className="list-container">
            {Object.values(playlistsListItems.items).map((Item, index) => (
                <div className="item" key={Item.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar
                                sx={{ width: 120, height: 85 }}
                                alt={Item.snippet.title}
                                src={Item.snippet.thumbnails.high.url}
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
                    </ListItem>

                    {index + 1 < playlistsListItems.items.length && (
                        <Divider className="divider" variant="middle" component="li" />
                    )}
                </div>
            ))}
        </List>
    )
}

export default Content
