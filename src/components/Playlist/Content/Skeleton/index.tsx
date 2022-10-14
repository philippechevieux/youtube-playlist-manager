import {List, ListItem, Divider} from '@mui/material';
import './styles.css';
import '../../styles.css';

function displaySkeletonContent(isFirstLoad: boolean) {
    return (
        <div>
            <List className="list-container skeleton">
                {!isFirstLoad && <Divider className="divider" variant="middle" component="li" />}

                {[...Array(5)].map((_, i) => (
                    <div key={i}>
                        <ListItem>
                            <div className="skeleton skeleton-content-preview"></div>
                            <div className="skeleton-content-item-container">
                                <div className="skeleton skeleton-content-item-primary"></div>
                                <div className="skeleton skeleton-content-item-secondary"></div>
                            </div>
                            <div className="skeleton skeleton-content-item-action"></div>
                        </ListItem>

                        {i + 1 < 5 && <Divider className="divider" variant="middle" component="li" />}
                    </div>
                ))}
            </List>
        </div>
    );
}

function ContentSkeleton({isFirstLoad}: {isFirstLoad: boolean}) {
    return <div>{displaySkeletonContent(isFirstLoad)}</div>;
}

export default ContentSkeleton;
