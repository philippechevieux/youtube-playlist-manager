import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';

function MetaWrapper() {
    const {t} = useTranslation();

    return (
        <Helmet>
            <title>{t('application name')}</title>
            <meta charSet="utf-8" />
            <link rel="icon" href="../../../public/favicon.ico" />
            <link rel="image" href="../../../public/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                rel="stylesheet"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content={t('application description')} />
            <link rel="apple-touch-icon" href="../../../public/logo192.png" />
            <link rel="manifest" href="../../../public/manifest.json" />
        </Helmet>
    );
}

export default MetaWrapper;
