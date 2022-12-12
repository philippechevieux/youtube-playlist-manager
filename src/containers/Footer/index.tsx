import {Divider} from '@mui/material';
import {useTranslation} from 'react-i18next';
import './styles.css';

function Footer() {
    const {t} = useTranslation();

    return (
        <div className="footer">
            <Divider />
        </div>
    );
}

export default Footer;
