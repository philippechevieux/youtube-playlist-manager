import {Box, Divider, Grid, Link} from '@mui/material';
import {useTranslation} from 'react-i18next';
import './styles.css';

function Footer() {
    const {t} = useTranslation();

    return (
        <div className="footer">
            <Divider />
            <Box className="footer-content">
                <Grid container direction="row" spacing={4} justifyContent="center">
                    <Grid item>
                        <Link
                            href="https://github.com/philippechevieux"
                            target="_blank"
                            variant="body2"
                            color="text.secondary"
                            underline="hover"
                        >
                            {t('made with and by')}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            href="https://github.com/philippechevieux/youtube-playlist-manager/issues"
                            target="_blank"
                            variant="body2"
                            color="text.secondary"
                            underline="hover"
                        >
                            {t('suggestion')}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            href="https://github.com/philippechevieux/youtube-playlist-manager/issues"
                            target="_blank"
                            variant="body2"
                            color="text.secondary"
                            underline="hover"
                        >
                            {t('report bug')}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Footer;
