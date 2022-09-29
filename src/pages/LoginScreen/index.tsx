import './styles.css'
import loginScreenIllustration from '../../assets/loginScreenIllustration.png'
import { useAppDispatch } from '../../app/hooks'
import { setUserLogin } from '../../utils/arms/user/reducer'
import { GoogleLogin } from 'react-google-login'
import { UserDataInterface } from '../../utils/arms/user/state'
import { useHistory } from 'react-router'

function Login() {
    let history = useHistory()
    const dispatch = useAppDispatch()

    const handleLogin = (response: any) => {
        const loginResponse: UserDataInterface = {
            accessToken: response.accessToken,
            language: 'fr',
            googleId: response.profileObj.googleId,
            email: response.profileObj.email,
            avatar: response.profileObj.imageUrl,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            fullName: response.profileObj.name,
            isUserLogin: true,
        }

        dispatch(setUserLogin({ googleLoginResponse: loginResponse }))
        history.push('/playlists')
    }

    const handleLoginFailure = () => {
        // TODO: handle login failure (maybe redisplay login screen with info ?)
    }

    return (
        <div className="login-screen-container">
            <div className="left-col">
                <h1 className="title">Gestionnaire de playlists YouTube</h1>
                <span>
                    Vous souhaitez retirer de vos playlists toutes les vidéos supprimées de YouTube en seul clique ? Cet
                    outil est fait pour vous...
                </span>
                <div className="login-button">
                    <GoogleLogin
                        clientId="232248135832-8f8h7mocgfdu17a7vpuul37pi5ugobt7.apps.googleusercontent.com"
                        buttonText="Se connecter"
                        scope="https://www.googleapis.com/auth/youtube"
                        responseType="permissions"
                        prompt="select_account"
                        onSuccess={handleLogin}
                        onFailure={handleLoginFailure}
                        cookiePolicy="single_host_origin"
                        theme="dark"
                        icon={false}
                    />
                </div>
            </div>
            <div className="right-col">
                <img
                    className="login-screen-illustration"
                    src={loginScreenIllustration}
                    alt="Personne travaillant sur un ordinateur"
                />
            </div>
        </div>
    )
}

export default Login
