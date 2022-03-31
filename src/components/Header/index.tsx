import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Menu, MenuItem, IconButton, Typography, Toolbar, Box, AppBar, Divider, Tooltip } from '@mui/material'

import AvatarCustom from '../AvatarCustom'
import './styles.css'

// import { GoogleLogin } from 'react-google-login'
import { useState, useContext } from 'react'
import { UserDataContext } from '../../utils/context'
import { useHistory } from 'react-router-dom'
import { UserDataActionTypes } from '../../utils/reducer'

function Header() {
    let history = useHistory()

    const { state, dispatch } = useContext(UserDataContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogout = () => {
        dispatch({ type: UserDataActionTypes.USER_LOGOUT })
        setAnchorEl(null)
    }

    // TODO: Search a fix for this any ...
    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleHomeClick = () => {
        history.push('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {state.isUserLogin && (
                        <Tooltip title="Accueil">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => handleHomeClick()}
                            >
                                <HomeOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Youtube Playlist Manager
                    </Typography>
                    {state.isUserLogin && (
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
                                disableScrollLock={true}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem key="profil" onClick={handleClose}>
                                    <AvatarCustom size="sm" />
                                    <span className="header-menuitem-margin-left">Mon profil</span>
                                </MenuItem>
                                <Divider />
                                <MenuItem key="logout" onClick={handleLogout}>
                                    <LogoutOutlinedIcon />
                                    <span className="header-menuitem-margin-left">Se déconnecter</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
