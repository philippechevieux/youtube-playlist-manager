// Aspact ratio : 223:175
import emptyState from '../../../assets/empty-state.png';
import './styles.css';

function EmptyIllustration({title}: {title?: string}) {
    return (
        <div className="empty-illustration-wrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://storyset.com/web">
                <img className="empty-illustration" src={emptyState} alt="Personne travaillant sur un ordinateur" />
            </a>
            {title && <p>{title}</p>}
        </div>
    );
}

export default EmptyIllustration;
