import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import {useAppSelector} from '../../app/hooks';
import {selectPlaylistContentsItemsByIndex} from '../../utils/arms/playlistContents/selectors';
import BottomPlayerBar from './BottomPlayerBar';
import YoutubeIFrame from './YoutubeIFrame';

function BottomPlayer({
    player,
    setPlayer,
    isVideoPaused,
    setIsVideoPaused,
    playlistId,
    playerVideoIndex,
    setPlayerVideoIndex,
    visible
}: {
    player: YouTubeEvent['target'];
    setPlayer: Function;
    isVideoPaused: boolean;
    setIsVideoPaused: Function;
    playlistId: string;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    visible: boolean;
}) {
    const [volume, setVolume] = useState<number | number[]>(0);
    const [isMuted, setIsMuted] = useState(false);

    const contentItem = useAppSelector(state => selectPlaylistContentsItemsByIndex(state, playerVideoIndex));

    return (
        <div className={`bottom-player ${!visible ? 'hidden' : ''}`}>
            <BottomPlayerBar
                player={player}
                playlistId={playlistId}
                contentItem={contentItem}
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
                setPlayerVideoIndex={setPlayerVideoIndex}
            />
        </div>
    );
}

export default BottomPlayer;
