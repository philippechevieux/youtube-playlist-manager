import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Menu, MenuItem, IconButton, Typography, Toolbar, Box, AppBar, Divider} from '@mui/material';

import AvatarCustom from '../../components/AvatarCustom';
import './styles.css';

import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setUserLogout} from '../../utils/arms/user/reducer';
import {selectIsUserLogin, selectUserFullName, selectUserAvatar} from '../../utils/arms/user/selectors';
import {useTranslation} from 'react-i18next';
import {setEmptyPlaylists} from '../../utils/arms/playlists/reducer';
import {setEmptyPlaylistContents} from '../../utils/arms/playlistContents/reducer';
import {AvatarSizeEnum} from '../../components/AvatarCustom/enums';

const Header: React.FC = () => {
    let history = useHistory();

    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const isUserLogin = useAppSelector(selectIsUserLogin);
    const userFullName = useAppSelector(selectUserFullName);
    const userAvatar = useAppSelector(selectUserAvatar);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOnGoHome = () => {
        if (isUserLogin) {
            history.push('/playlists');
        }
    };

    const handleClickOnLogout = () => {
        dispatch(setEmptyPlaylists());
        dispatch(setEmptyPlaylistContents());
        dispatch(setUserLogout());
        setAnchorEl(null);
    };

    const handleClickOnGoToMyProfile = () => {
        history.push('/profile');
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className="appbar-wrapper" position="fixed">
                <Toolbar>
                    <div className="title-wrapper">
                        <Typography
                            variant="h2"
                            component="div"
                            sx={{flexGrow: 1}}
                            onClick={() => handleClickOnGoHome()}
                        >
                            {t('application name')}
                        </Typography>
                    </div>
                    {isUserLogin && (
                        <div>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AvatarCustom title={userFullName} source={userAvatar} size={AvatarSizeEnum.MD} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                disableScrollLock={true}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem key="profil" onClick={handleClickOnGoToMyProfile}>
                                    <AvatarCustom title={userFullName} source={userAvatar} size={AvatarSizeEnum.SM} />
                                    <span className="header-menuitem-margin-left">{t('my profile')}</span>
                                </MenuItem>
                                <Divider />
                                <MenuItem key="logout" onClick={handleClickOnLogout}>
                                    <LogoutOutlinedIcon />
                                    <span className="header-menuitem-margin-left">{t('sign out')}</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
