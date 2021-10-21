import AccountCircle from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import { useContext } from 'react'
import { GoogleAccountDataContext } from '../../utils/context'

function AvatarCustom({ size }) {
    // Get googleAccountData context
    const { googleAccountData } = useContext(GoogleAccountDataContext)

    function getAvatarSize(paramSize) {
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
            {googleAccountData.avatar ? (
                <Avatar
                    alt={googleAccountData.fullName}
                    src={googleAccountData.avatar}
                    sx={{ width: getAvatarSize(size), height: getAvatarSize(size) }}
                />
            ) : (
                <AccountCircle />
            )}
        </div>
    )
}

export default AvatarCustom
