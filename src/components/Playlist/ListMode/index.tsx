import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Divider,
    ListItemText,
    Typography,
    Radio,
    Tooltip,
} from '@mui/material'
import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'

import './styles.css'
import { useAppDispatch } from '../../../app/hooks'
import { ItemInterface, ItemsInterface } from '../../../utils/arms/playlists/state'
// import { displayEditPlaylistDialog } from '../../../utils/arms/global/reducer'

function ListMode({
    playlistsListData,
    setCanExecuteAfterSelect,
    setSelectedPlaylistId,
    mode = 'default',
    updatePlaylistListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: ItemsInterface
    setCanExecuteAfterSelect?: Function
    setSelectedPlaylistId?: Function
    mode?: string
    updatePlaylistListData?: Function
    handlePlaylistClickOnList?: Function
}) {
    const dispatch = useAppDispatch()

    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    const handleChangeSelectedPlaylist = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlaylist(event.target.value)

        if (setCanExecuteAfterSelect !== undefined) {
            setCanExecuteAfterSelect(true)
        }

        if (setSelectedPlaylistId !== undefined) {
            setSelectedPlaylistId(event.target.value)
        }
    }

    const handleListItemSecondaryActionByMode = (PlaylistData: ItemInterface) => {
        if (mode === 'default' && updatePlaylistListData && handlePlaylistClickOnList) {
            return (
                <div>
                    <Tooltip title="Editer">
                        <IconButton
                            className="margin"
                            edge="end"
                            aria-label="share"
                            onClick={() => {
                                // dispatch(
                                //     displayEditPlaylistDialog({
                                //         editPlaylistDialogData: PlaylistData,
                                //         editPlaylistDialogOnClose: updatePlaylistListData,
                                //         editPlaylistDialogId: PlaylistData.id,
                                //     })
                                // )
                            }}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ouvrir la playlist">
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() => handlePlaylistClickOnList(PlaylistData.id)}
                        >
                            <LaunchOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    }

    const handleListItemAvatarByMode = (PlaylistData: ItemInterface) => {
        if (mode === 'default') {
            return (
                <Avatar
                    sx={{ width: 120, height: 85 }}
                    alt={PlaylistData.snippet.localized.title}
                    src={PlaylistData.snippet.thumbnails.high.url}
                    variant="square"
                />
            )
        } else if (mode === 'selectPlaylist') {
            return (
                <Avatar
                    sx={{ width: 90, height: 75 }}
                    alt={PlaylistData.snippet.localized.title}
                    src={PlaylistData.snippet.thumbnails.high.url}
                    variant="square"
                />
            )
        }
    }

    const handleRadioButtonByMode = (PlaylistData: ItemInterface) => {
        if (mode === 'selectPlaylist') {
            return (
                <Radio
                    checked={selectedPlaylist === PlaylistData.id}
                    onChange={handleChangeSelectedPlaylist}
                    value={PlaylistData.id}
                    name="select-playlist"
                    color="secondary"
                />
            )
        }
    }

    const handleClickOnItem = (PlaylistData: ItemInterface) => {
        if (mode === 'selectPlaylist') {
            setSelectedPlaylist(PlaylistData.id)

            if (setCanExecuteAfterSelect !== undefined) {
                setCanExecuteAfterSelect(true)
            }

            if (setSelectedPlaylistId !== undefined) {
                setSelectedPlaylistId(PlaylistData.id)
            }
        }
    }

    return (
        <List className={`${mode === 'default' ? 'list-container' : ''}`}>
            {playlistsListData.items?.map((PlaylistData, index) => (
                <div
                    className={`item ${mode === 'selectPlaylist' ? 'item-selectable' : ''} ${
                        selectedPlaylist === PlaylistData.id ? 'item-selected' : ''
                    }`}
                    key={PlaylistData.id}
                    onClick={() => handleClickOnItem(PlaylistData)}
                >
                    <ListItem secondaryAction={handleListItemSecondaryActionByMode(PlaylistData)}>
                        {handleRadioButtonByMode(PlaylistData)}
                        <ListItemAvatar>{handleListItemAvatarByMode(PlaylistData)}</ListItemAvatar>
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
