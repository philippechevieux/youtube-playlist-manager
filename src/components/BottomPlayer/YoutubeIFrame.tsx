import YouTube from 'react-youtube';

function YoutubeIFrame({playedVideoId, setPlayer}: {playedVideoId: string; setPlayer: Function}) {
    return (
        <YouTube
            videoId={playedVideoId}
            onReady={e => {
                setPlayer(e.target);
                e.target.playVideo();
            }}
            opts={{height: '100px', width: '250px'}}
        />
    );
}

export default YoutubeIFrame;
