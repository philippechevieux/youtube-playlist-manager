import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Divider,
    ListItemText,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material'
import React, { useContext, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'

import { IPlaylistsData, IPlaylistsItemData } from '../../../utils/context/interface'
import './styles.css'
import { DialogActionTypes } from '../../../utils/reducer'
import { UserDataContext } from './../../../utils/context/index'

function ListMode({
    playlistsListData,
    setCanExecuteAfterSelect,
    mode = 'default',
    updatePlaylistListData,
    handlePlaylistClickOnList,
}: {
    playlistsListData: IPlaylistsData
    setCanExecuteAfterSelect?: Function
    mode?: string
    updatePlaylistListData?: Function
    handlePlaylistClickOnList?: Function
}) {
    const { dispatch } = useContext(UserDataContext)
    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    const handleChangeSelectedPlaylist = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlaylist(event.target.value)

        if (setCanExecuteAfterSelect !== undefined) {
            setCanExecuteAfterSelect(true)
        }
    }

    const handleListItemSecondaryActionByMode = (PlaylistData: IPlaylistsItemData) => {
        if (mode === 'default' && updatePlaylistListData && handlePlaylistClickOnList) {
            return (
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
                    <IconButton edge="end" aria-label="edit" onClick={() => handlePlaylistClickOnList(PlaylistData.id)}>
                        <LaunchOutlinedIcon />
                    </IconButton>
                </div>
            )
        }
    }

    const handleListItemAvatarByMode = (PlaylistData: IPlaylistsItemData) => {
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

    const handleRadioButtonByMode = (PlaylistData: IPlaylistsItemData) => {
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

    const handleClickOnItem = (PlaylistData: IPlaylistsItemData) => {
        if (mode === 'selectPlaylist') {
            setSelectedPlaylist(PlaylistData.id)

            if (setCanExecuteAfterSelect !== undefined) {
                setCanExecuteAfterSelect(true)
            }
        }
    }

    return (
        <List className={`${mode === 'mode' ? 'list-container' : ''}`}>
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
