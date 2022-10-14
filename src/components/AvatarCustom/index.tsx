import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

export enum AvatarSize {
    XXXL = 120,
    XXL = 100,
    XL = 80,
    L = 60,
    MD = 40,
    SM = 25
}

function AvatarCustom({title, source, size = AvatarSize.MD}: {title: string; source?: string; size?: AvatarSize}) {
    function getAvatarSize(paramSize: AvatarSize) {
        switch (paramSize) {
            case AvatarSize.XXXL:
                return 120;
            case AvatarSize.XXL:
                return 100;
            case AvatarSize.XL:
                return 80;
            case AvatarSize.L:
                return 60;
            case AvatarSize.MD:
                return 40;
            case AvatarSize.SM:
            default:
                return 25;
        }
    }

    return (
        <div>
            {source ? (
                <Avatar alt={title} src={source} sx={{width: getAvatarSize(size), height: getAvatarSize(size)}} />
            ) : (
                <AccountCircle />
            )}
        </div>
    );
}

export default AvatarCustom;
