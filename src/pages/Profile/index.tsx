import {
    AppBar,
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    ListItemText,
    MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import './styles.css';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import AvatarCustom, {AvatarSizeEnum} from '../../components/AvatarCustom';

import {useHistory} from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setUserLanguage} from '../../utils/arms/user/reducer';
import {selectUserFullName, selectUserAvatar, selectUserLanguage} from '../../utils/arms/user/selectors';
import {useTranslation} from 'react-i18next';

function Profile() {
    let history = useHistory();

    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const userFullName = useAppSelector(selectUserFullName);
    const userAvatar = useAppSelector(selectUserAvatar);
    const userLanguage = useAppSelector(selectUserLanguage);

    const handleHomeClick = () => {
        history.push('/playlists');
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserLanguage({language: event.target.value}));
    };

    return (
        <div className="">
            <AppBar position="static">
                <Box sx={{flexGrow: 1}}>
                    <Toolbar>
                        <Tooltip title={t('back')}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => handleHomeClick()}
                            >
                                <ChevronLeftOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1" color="text.primary">
                            {t('my profile')}
                        </Typography>
                    </Toolbar>
                </Box>
            </AppBar>
            <div className="profile-options-container">
                <div>
                    <Grid container direction="column" alignItems="center" justifyContent="center">
                        <AvatarCustom title={userFullName} source={userAvatar} size={AvatarSizeEnum.XL} />
                        <Typography variant="h5" color="text.primary" className="profile-options-title">
                            {t('welcome')} {userFullName}
                        </Typography>
                    </Grid>
                </div>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography variant="h5" color="text.primary" className="profile-options-subtitle">
                            {t('my preferences')}
                        </Typography>
                        <TextField
                            select
                            id="select-language"
                            margin="normal"
                            color="secondary"
                            label={t('language')}
                            value={userLanguage}
                            onChange={handleLanguageChange}
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem key="fr" value="fr">
                                <img
                                    className="flag-icon"
                                    loading="lazy"
                                    height="13"
                                    width="20"
                                    src={`https://flagcdn.com/w20/fr.png`}
                                    alt={t('french')}
                                />
                                <ListItemText className="select-item-text" primary={t('french')}></ListItemText>
                            </MenuItem>
                            <MenuItem key="en" value="en">
                                <img
                                    className="flag-icon"
                                    loading="lazy"
                                    height="13"
                                    width="20"
                                    src={`https://flagcdn.com/w20/gb.png`}
                                    alt={t('english')}
                                />
                                <ListItemText className="select-item-text" primary={t('english')} />
                            </MenuItem>
                        </TextField>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Profile;
