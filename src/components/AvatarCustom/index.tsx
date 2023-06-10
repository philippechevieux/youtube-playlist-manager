import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import {AvatarSizeEnum} from './enums';

interface AvatarCustomProps {
    title: string;
    source?: string;
    size?: AvatarSizeEnum;
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({title, source, size = AvatarSizeEnum.MD}) => {
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
};

export default AvatarCustom;
