import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

export enum AvatarSizeEnum {
    XXXL = 120,
    XXL = 100,
    XL = 80,
    L = 60,
    MD = 40,
    SM = 25
}

function AvatarCustom({
    title,
    source,
    size = AvatarSizeEnum.MD
}: {
    title: string;
    source?: string;
    size?: AvatarSizeEnum;
}) {
    function getAvatarSize(paramSize: AvatarSizeEnum) {
        switch (paramSize) {
            case AvatarSizeEnum.XXXL:
                return 120;
            case AvatarSizeEnum.XXL:
                return 100;
            case AvatarSizeEnum.XL:
                return 80;
            case AvatarSizeEnum.L:
                return 60;
            case AvatarSizeEnum.MD:
                return 40;
            case AvatarSizeEnum.SM:
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
