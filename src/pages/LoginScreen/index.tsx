import './styles.css';
import {useAppDispatch} from '../../app/hooks';
import {useGoogleLogin} from '@react-oauth/google';

import {useHistory} from 'react-router';
import {AvailableLangague, UserDataInterface, userDefaultData} from '../../utils/arms/user/state';
import {setUserLogin} from '../../utils/arms/user/reducer';
import LoginIllustration from '../../components/Assets/LoginIllustration';
import {useTranslation} from 'react-i18next';
import {Button} from '@mui/material';
import {getUserInfo} from '../../utils/api';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
    let history = useHistory();

    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();

    const login = useGoogleLogin({
        prompt: 'select_account',
        scope: 'https://www.googleapis.com/auth/youtube',
        onSuccess: async res => {
            const {data} = await getUserInfo(res.access_token);

            const loginResponse: UserDataInterface = {
                accessToken: res.access_token,
                email: data.email,
                avatar: data.picture,
                firstName: data.given_name,
                lastName: data.family_name,
                fullName: data.name,
                isUserLogin: true,
                language: i18n.language as AvailableLangague,
                playlistDisplayMode: userDefaultData.playlistDisplayMode
            };

            dispatch(setUserLogin({googleLoginResponse: loginResponse}));
            history.push('/playlists');
        },
        onError: () => {
            console.error('An error occured while sign in');
        }
    });

    return (
        <div className="login-screen-container">
            <div className="left-col">
                <h1 className="title">{t('login screen title')}</h1>
                <span>{t('login screen subtitle')}</span>
                <div className="login-button">
                    <Button startIcon={<GoogleIcon />} variant="contained" color="secondary" onClick={() => login()}>
                        {t('sign in')}
                    </Button>
                </div>
            </div>
            <div className="right-col">
                <LoginIllustration />
            </div>
        </div>
    );
}

export default Login;
