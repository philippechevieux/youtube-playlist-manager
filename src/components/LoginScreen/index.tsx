import './styles.css'
import loginScreenIllustration from '../../assets/loginScreenIllustration.png'

function Login() {
    return (
        <div className="login-screen-container">
            <div className="left-col">
                <h1 className="title">Gestionnaire de playlists YouTube</h1>
                <span>
                    Vous souhaitez retirer de vos playlists toutes les vidéos supprimées de YouTube en seul clique ? Cet
                    outil est fait pour vous...
                </span>
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
