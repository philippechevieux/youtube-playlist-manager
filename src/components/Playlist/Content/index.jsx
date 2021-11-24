import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography } from '@mui/material'

function Content({ playlistsListItems }) {
    // TODO: Later execute a second request to retrieve videos duration. Maybe this request should be done in playlistlist

    return (
        <List>
            {playlistsListItems.items?.map((Item, index) => (
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
                            className=""
                            primary={
                                <Typography className="primary" variant="body1" color="text.primary">
                                    {Item.snippet.title}
                                </Typography>
                            }
                            secondary={
                                <Typography className="secondary" variant="body2" color="text.secondary">
                                    {/* {Item.snippet.localized.description === ''
                                        ? 'Aucune description'
                                        : Item.snippet.localized.description} */}
                                </Typography>
                            }
                        />
                    </ListItem>

                    <Divider variant="middle" component="li" />
                </div>
            ))}
        </List>
    )
}

export default Content
