import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Menu, MenuItem, IconButton, Typography, Toolbar, Box, AppBar, Divider, Tooltip} from '@mui/material';

import AvatarCustom, {AvatarSize} from '../AvatarCustom';
import './styles.css';

import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setUserLogout} from '../../utils/arms/user/reducer';
import {selectIsUserLogin, selectUserFullName, selectUserAvatar} from '../../utils/arms/user/selectors';

function Header() {
    let history = useHistory();

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
        history.push('/playlists');
    };

    const handleClickOnLogout = () => {
        dispatch(setUserLogout());
        setAnchorEl(null);
    };

    const handleClickOnGoToMyProfile = () => {
        history.push('/profile');
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    {isUserLogin && (
                        <Tooltip title="Accueil">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                                onClick={() => handleClickOnGoHome()}
                            >
                                <HomeOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Youtube Playlist Manager
                    </Typography>
                    {isUserLogin && (
                        <div>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AvatarCustom title={userFullName} source={userAvatar} size={AvatarSize.MD} />
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
                                    <AvatarCustom title={userFullName} source={userAvatar} size={AvatarSize.SM} />
                                    <span className="header-menuitem-margin-left">Mon profil</span>
                                </MenuItem>
                                <Divider />
                                <MenuItem key="logout" onClick={handleClickOnLogout}>
                                    <LogoutOutlinedIcon />
                                    <span className="header-menuitem-margin-left">Se déconnecter</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
