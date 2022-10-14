import {Grid, Card} from '@mui/material';
import './styles.css';
import '../styles.css';
import '../../styles.css';

function displaySkeletonContent() {
    return (
        <Grid
            container
            direction="row"
            rowSpacing={4}
            columnSpacing={4}
            alignItems="flex-start"
            className="grid-container skeleton"
        >
            {[...Array(4)].map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card className="card">
                        <div className="skeleton mosaic-mode-skeleton-preview"></div>
                        <div className="skeleton mosaic-mode-skeleton-title"></div>
                        <div className="skeleton mosaic-mode-skeleton-description"></div>
                        <div className="mosaic-mode-skeleton-actions-container">
                            <div className="skeleton mosaic-mode-skeleton-actions"></div>
                            <div className="skeleton mosaic-mode-skeleton-actions"></div>
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

function MosaicModeSkeleton() {
    return <div>{displaySkeletonContent()}</div>;
}

export default MosaicModeSkeleton;
