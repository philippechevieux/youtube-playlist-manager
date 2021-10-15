import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'

import AvatarCustom from '../AvatarCustom'
import './styles.css'

import { GoogleLogin } from 'react-google-login'
import { useState } from 'react'

function Header({ googleAccountData, setGoogleAccountData }) {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogin = (response) => {
        console.log('handleLogin', response)
        console.log(response.ht)

        const googleAccountDataReceive = {
            firstName: response.ht['HU'],
            lastName: response.ht['YS'],
            fullName: response.ht['Re'],
            email: response.ht['St'],
            avatar: response.ht['kK'],
            googleId: response.ht['sT'],
        }

        console.log('googleAccountDataReceive : ', googleAccountDataReceive)

        setGoogleAccountData(googleAccountDataReceive)
    }

    const handleLoginFailure = (response) => {
        setGoogleAccountData(null)
    }

    const handleLogout = () => {
        setGoogleAccountData(null)
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
            <AppBar position="static">
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
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AvatarCustom googleAccountData={googleAccountData} size="md" />
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
                                    <AvatarCustom googleAccountData={googleAccountData} size="sm" />
                                    <span className="header-menuitem-margin-left">Mon profil</span>
                                </MenuItem>
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
                            onSuccess={handleLogin}
                            onFailure={handleLoginFailure}
                            cookiePolicy="single_host_origin"
                        />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
