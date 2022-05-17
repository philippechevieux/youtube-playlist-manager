import AccountCircle from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'

function AvatarCustom({ title, source, size = 'md' }: { title: string; source?: string; size?: string }) {
    function getAvatarSize(paramSize: string) {
        switch (paramSize) {
            case 'xxxl':
                return 120
            case 'xxl':
                return 100
            case 'xl':
                return 80
            case 'l':
                return 60
            case 'md':
                return 40
            case 'sm':
            default:
                return 25
        }
    }

    return (
        <div>
            {source ? (
                <Avatar alt={title} src={source} sx={{ width: getAvatarSize(size), height: getAvatarSize(size) }} />
            ) : (
                <AccountCircle />
            )}
        </div>
    )
}

export default AvatarCustom
