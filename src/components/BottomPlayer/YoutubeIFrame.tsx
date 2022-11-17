import YouTube from 'react-youtube';

function YoutubeIFrame({
    playlistId,
    setPlayer,
    setIsVideoPaused,
    setVolume
}: {
    playlistId: string;
    setPlayer: Function;
    setIsVideoPaused: Function;
    setVolume: Function;
}) {
    return (
        <YouTube
            onReady={e => {
                setPlayer(e.target);
                setVolume(e.target.getVolume());

                // Load the playlist in the iframe but doesn't play it
                e.target.cuePlaylist({
                    list: playlistId,
                    listType: 'search'
                });
            }}
            onPlay={() => setIsVideoPaused(false)}
            onPause={() => setIsVideoPaused(true)}
            opts={{height: '100px', width: '250px'}}
        />
    );
}

export default YoutubeIFrame;
