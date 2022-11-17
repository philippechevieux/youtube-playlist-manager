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
    const [volume, setVolume] = useState<number | number[]>(0);
    const [isMuted, setIsMuted] = useState(false);

    return (
        <>
            <BottomPlayerBar
                player={player}
                playlistId={playlistId}
                isVideoPaused={isVideoPaused}
                setIsVideoPaused={setIsVideoPaused}
                volume={volume}
                setVolume={setVolume}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
            />
            <YoutubeIFrame
                setPlayer={setPlayer}
                playlistId={playlistId}
                setIsVideoPaused={setIsVideoPaused}
                setVolume={setVolume}
            />
        </>
    );
}

export default BottomPlayer;
