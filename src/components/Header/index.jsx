import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { GoogleLogin } from 'react-google-login'
import { useState } from 'react'

function Header({ token, setToken }) {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogin = (response) => {
        console.log(response)
        setToken('2222')
    }

    const handleLoginFailure = (response) => {
        console.log(response)
        setToken(null)
    }

    const handleLogout = () => {
        setToken(null)
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
                    {token ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
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
                                    Mon profil
                                </MenuItem>
                                <MenuItem key="logout" onClick={handleLogout}>
                                    Se déconnecter
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
