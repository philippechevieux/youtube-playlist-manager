import { List, ListItem, Divider } from '@mui/material'
import './styles.css'
import '../../styles.css'

function displaySkeletonContent() {
    return (
        <div>
            <List className="list-container skeleton">
                {[...Array(5)].map((e, i) => (
                    <div>
                        <ListItem>
                            <div className="skeleton skeleton-content-preview"></div>
                            <div className="skeleton-content-item-container">
                                <div className="skeleton skeleton-content-item-primary"></div>
                                <div className="skeleton skeleton-content-item-secondary"></div>
                            </div>
                            <div className="skeleton skeleton-content-item-action"></div>
                        </ListItem>
                        <Divider className="divider" variant="middle" component="li" />
                    </div>
                ))}
            </List>
        </div>
    )
}

function ContentSkeleton() {
    return <div>{displaySkeletonContent()}</div>
}

export default ContentSkeleton
