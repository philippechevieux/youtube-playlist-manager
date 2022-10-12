// Aspact ratio : 1724:1221
import mediaPlayer from '../../../assets/media-player.png';
import './styles.css';

function LoginIllustration() {
    return (
        <a target="_blank" rel="noopener noreferrer" href="https://storyset.com/web">
            <img className="login-screen-illustration" src={mediaPlayer} alt="Personne travaillant sur un ordinateur" />
        </a>
    );
}

export default LoginIllustration;
