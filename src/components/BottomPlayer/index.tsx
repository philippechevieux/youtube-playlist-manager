import {useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import {useAppSelector} from '../../app/hooks';
import {selectPlaylistContentsItemsByIndex} from '../../utils/arms/playlistContents/selectors';
import BottomPlayerBar from './BottomPlayerBar';

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
    const contentItem = useAppSelector(state => selectPlaylistContentsItemsByIndex(state, playerVideoIndex));

    return (
        <div className={`bottom-player ${!visible ? 'hidden' : ''}`}>
            <BottomPlayerBar
                setPlayer={setPlayer}
                player={player}
                setPlayerVideoIndex={setPlayerVideoIndex}
                playlistId={playlistId}
                contentItem={contentItem}
                isVideoPaused={isVideoPaused}
                setIsVideoPaused={setIsVideoPaused}
            />
        </div>
    );
}

export default BottomPlayer;
