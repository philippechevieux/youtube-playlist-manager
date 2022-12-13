import {List, ListItem, ListItemAvatar, Avatar, Divider, ListItemText, Typography, Radio, Tooltip} from '@mui/material';
import React, {useState} from 'react';

import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import './styles.css';
import {ItemInterface, ItemsInterface} from '../../../utils/arms/playlists/state';
import {useTranslation} from 'react-i18next';

export enum DisplayListModeEnum {
    DEFAULT = 'default',
    SELECTION = 'selection'
}

function ListMode({
    playlistsListData,
    setCanExecuteAfterSelect,
    setSelectedPlaylistId,
    mode = DisplayListModeEnum.DEFAULT,
    onClickOnEditPlaylist,
    onClickOnOpenPlaylist
}: {
    playlistsListData: ItemsInterface;
    setCanExecuteAfterSelect?: Function;
    setSelectedPlaylistId?: Function;
    mode?: DisplayListModeEnum;
    onClickOnEditPlaylist?: Function;
    onClickOnOpenPlaylist?: Function;
}) {
    const {t} = useTranslation();
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const handleChangeSelectedPlaylist = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlaylist(event.target.value);

        if (setCanExecuteAfterSelect !== undefined) {
            setCanExecuteAfterSelect(true);
        }

        if (setSelectedPlaylistId !== undefined) {
            setSelectedPlaylistId(event.target.value);
        }
    };

    const handleListItemSecondaryActionByMode = (PlaylistData: ItemInterface) => {
        if (mode === DisplayListModeEnum.DEFAULT && onClickOnEditPlaylist && onClickOnOpenPlaylist) {
            return (
                <div>
                    <Tooltip title={t('edit')}>
                        <IconButton
                            className="margin"
                            edge="end"
                            onClick={() => onClickOnEditPlaylist(PlaylistData.id)}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }
    };

    const handleListItemAvatarByMode = (PlaylistData: ItemInterface) => {
        if (mode === DisplayListModeEnum.DEFAULT && onClickOnOpenPlaylist) {
            return (
                <Avatar
                    className="open-playlist-pointer list-item-avatar"
                    alt={PlaylistData.snippet.localized.title}
                    src={PlaylistData.snippet.thumbnails.high.url}
                    variant="square"
                    onClick={() => onClickOnOpenPlaylist(PlaylistData.id)}
                />
            );
        } else if (mode === DisplayListModeEnum.SELECTION) {
            return (
                <Avatar
                    sx={{width: 90, height: 75}}
                    alt={PlaylistData.snippet.localized.title}
                    src={PlaylistData.snippet.thumbnails.high.url}
                    variant="square"
                />
            );
        }
    };

    const handleRadioButtonByMode = (PlaylistData: ItemInterface) => {
        if (mode === DisplayListModeEnum.SELECTION) {
            return (
                <Radio
                    checked={selectedPlaylist === PlaylistData.id}
                    onChange={handleChangeSelectedPlaylist}
                    value={PlaylistData.id}
                    name="select-playlist"
                    color="secondary"
                />
            );
        }
    };

    const handleClickOnItem = (PlaylistData: ItemInterface) => {
        if (mode === DisplayListModeEnum.SELECTION) {
            setSelectedPlaylist(PlaylistData.id);

            if (setCanExecuteAfterSelect !== undefined) {
                setCanExecuteAfterSelect(true);
            }

            if (setSelectedPlaylistId !== undefined) {
                setSelectedPlaylistId(PlaylistData.id);
            }
        }
    };

    return (
        <List className={`${mode === DisplayListModeEnum.DEFAULT ? 'list-container' : ''}`}>
            {playlistsListData.items?.map((PlaylistData, index) => (
                <div
                    className={`playlist-item ${mode === DisplayListModeEnum.SELECTION ? 'item-selectable' : ''} ${
                        selectedPlaylist === PlaylistData.id ? 'item-selected' : ''
                    }`}
                    key={PlaylistData.id}
                    onClick={() => handleClickOnItem(PlaylistData)}
                >
                    <ListItem className="list-item" secondaryAction={handleListItemSecondaryActionByMode(PlaylistData)}>
                        {handleRadioButtonByMode(PlaylistData)}
                        <ListItemAvatar>{handleListItemAvatarByMode(PlaylistData)}</ListItemAvatar>
                        <ListItemText
                            className="list-item-text list-item-text-margin"
                            primary={
                                <Typography
                                    className="primary open-playlist-pointer"
                                    variant="h6"
                                    onClick={() =>
                                        mode === DisplayListModeEnum.DEFAULT &&
                                        onClickOnOpenPlaylist &&
                                        onClickOnOpenPlaylist(PlaylistData.id)
                                    }
                                >
                                    {PlaylistData.snippet.localized.title}
                                </Typography>
                            }
                            secondary={
                                <Typography className="secondary" variant="body2" color="text.secondary">
                                    {PlaylistData.snippet.localized.description === ''
                                        ? t('no description')
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
    );
}

export default ListMode;
