import './styles.css'
import waitingScreen from '../../assets/waiting-screen.png'

function Login() {
    return (
        <div className="waiting-screen-container">
            <div className="left-col">
                <h1 className="title">Gestionnaire de playlists YouTube</h1>
                <span>
                    Vous souhaitez retirer de vos playlists toutes les vidéos supprimées de YouTube en seul clique ? Cet
                    outil est fait pour vous...
                </span>
            </div>
            <div className="right-col">
                <img src={waitingScreen} alt="Personne travaillant sur un ordinateur" />
            </div>
        </div>
    )
}

export default Login
