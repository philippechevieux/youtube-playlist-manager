import {YouTubeEvent} from 'react-youtube';

export interface playerStateInterface {
    player: YouTubeEvent['target'];
    videoId: string;
    videoIndex: number | undefined;
    shouldDisplayBottomBatar: boolean;
    isPlayerPaused: boolean;
    cuePlaylistId: string;
}
