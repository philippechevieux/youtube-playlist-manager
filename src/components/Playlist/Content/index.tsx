import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material'

import '../styles.css'

// TODO: move Interface declaration when i will introduce playlistlist context (to avoir useless reloading)
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

interface IPlaylistsListItems {
    items: Array<EnumPlaylistItemsContent>
}

function Content({ playlistsListItems }: { playlistsListItems: IPlaylistsListItems }) {
    // TODO: Later execute a second request to retrieve videos duration. Maybe this request should be done in playlistlist

    return (
        <List className="list-container">
            {playlistsListItems.items?.map((Item) => (
                <div key={Item.id}>
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

                    <Divider className="divider" variant="middle" component="li" />
                </div>
            ))}
        </List>
    )
}

export default Content
