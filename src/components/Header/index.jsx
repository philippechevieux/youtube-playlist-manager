import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import { Menu, MenuItem, IconButton, Typography, Toolbar, Box, AppBar, Divider } from '@mui/material'

import AvatarCustom from '../AvatarCustom'
import './styles.css'

import { GoogleLogin } from 'react-google-login'
import { useState, useContext } from 'react'
import { GoogleAccountDataContext } from '../../utils/context/'

function Header() {
    // Get googleAccountData context
    const { googleAccountData, saveGoogleAccountData } = useContext(GoogleAccountDataContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogin = (response) => {
        saveGoogleAccountData(response)
    }

    const handleLoginFailure = (response) => {
        saveGoogleAccountData(null)
    }

    const handleLogout = () => {
        saveGoogleAccountData(null)
        setAnchorEl(null)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Youtube Playlist Manager
                    </Typography>
                    {googleAccountData ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AvatarCustom size="md" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem key="profil" onClick={handleClose}>
                                    <AvatarCustom size="sm" />
                                    <span className="header-menuitem-margin-left">Mon profil</span>
                                </MenuItem>
                                <Divider />
                                <MenuItem key="logout" onClick={handleLogout}>
                                    <LogoutIcon />
                                    <span className="header-menuitem-margin-left">Se déconnecter</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <GoogleLogin
                            clientId="232248135832-8f8h7mocgfdu17a7vpuul37pi5ugobt7.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            scope="https://www.googleapis.com/auth/youtube"
                            responseType="permissions"
                            prompt="select_account"
                            onSuccess={handleLogin}
                            onFailure={handleLoginFailure}
                            cookiePolicy="single_host_origin"
                            theme="dark"
                            icon={false}
                        />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
