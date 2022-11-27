import {YouTubeEvent} from 'react-youtube';
import {useAppSelector} from '../../app/hooks';
import {selectPlaylistContentsItemsByIndex} from '../../utils/arms/playlistContents/selectors';
import BottomPlayerBar from './BottomPlayerBar';

function BottomPlayer({
    player,
    setPlayer,
    isPlayerPaused,
    setIsPlayerPaused,
    playlistId,
    playerVideoIndex,
    setPlayerVideoIndex,
    visible
}: {
    player: YouTubeEvent['target'];
    setPlayer: Function;
    isPlayerPaused: boolean;
    setIsPlayerPaused: Function;
    playlistId: string;
    playerVideoIndex: number | undefined;
    setPlayerVideoIndex: Function;
    visible: boolean;
}) {
    const contentItem = useAppSelector(state => selectPlaylistContentsItemsByIndex(state, playerVideoIndex));

    return (
        <div className={`bottom-player ${!visible ? 'hidden' : ''}`}>
            <BottomPlayerBar
                setPlayer={setPlayer}
                player={player}
                setPlayerVideoIndex={setPlayerVideoIndex}
                playlistId={playlistId}
                contentItem={contentItem}
                isPlayerPaused={isPlayerPaused}
                setIsPlayerPaused={setIsPlayerPaused}
            />
        </div>
    );
}

export default BottomPlayer;
