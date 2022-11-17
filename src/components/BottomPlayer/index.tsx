import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import BottomPlayerBar from './BottomPlayerBar';
import YoutubeIFrame from './YoutubeIFrame';

function BottomPlayer({
    player,
    setPlayer,
    playlistId
}: {
    player: YouTubeEvent['target'];
    setPlayer: Function;
    playlistId: string;
}) {
    const [isVideoPaused, setIsVideoPaused] = useState(true);

    return (
        <>
            <BottomPlayerBar
                player={player}
                playlistId={playlistId}
                isVideoPaused={isVideoPaused}
                setIsVideoPaused={setIsVideoPaused}
            />
            <YoutubeIFrame setPlayer={setPlayer} playlistId={playlistId} setIsVideoPaused={setIsVideoPaused} />
        </>
    );
}

export default BottomPlayer;
