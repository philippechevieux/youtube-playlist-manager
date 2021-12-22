import AccountCircle from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import { useContext } from 'react'
import { UserDataContext } from '../../utils/context/userData'

function AvatarCustom({ size }: { size: string }) {
    const { state } = useContext(UserDataContext)

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
            {state.avatar ? (
                <Avatar
                    alt={state.fullName}
                    src={state.avatar}
                    sx={{ width: getAvatarSize(size), height: getAvatarSize(size) }}
                />
            ) : (
                <AccountCircle />
            )}
        </div>
    )
}

export default AvatarCustom
