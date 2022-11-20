import YouTube from 'react-youtube';

function YoutubeIFrame({
    playlistId,
    setPlayer,
    setIsVideoPaused,
    setVolume,
    setPlayerVideoIndex
}: {
    playlistId: string;
    setPlayer: Function;
    setIsVideoPaused: Function;
    setVolume: Function;
    setPlayerVideoIndex: Function;
}) {
    return (
        <YouTube
            className="youtube-iframe"
            onReady={e => {
                setPlayer(e.target);
                setVolume(e.target.getVolume());

                // Load the playlist in the iframe but doesn't play it
                e.target.cuePlaylist({
                    list: playlistId,
                    listType: 'search'
                });
            }}
            onStateChange={e => {
                setPlayerVideoIndex(e.target.playerInfo.playlistIndex);
            }}
            onPlay={() => setIsVideoPaused(false)}
            onPause={() => setIsVideoPaused(true)}
            opts={{height: '100px', width: '250px'}}
        />
    );
}

export default YoutubeIFrame;
