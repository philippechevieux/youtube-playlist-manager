import {useEffect, useRef, useState} from 'react';
import {YouTubeEvent} from 'react-youtube';
import {toHHMMSS} from '../../../utils/Functions';

function Timer({player}: {player: YouTubeEvent['target']}) {
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                if (player?.playerInfo.duration !== undefined && progress === 0) {
                    setDuration(player.playerInfo.duration);
                }

                if (player?.playerInfo.currentTime !== undefined) {
                    setCurrentTime(player.playerInfo.currentTime);
                }

                const newProgress = (currentTime / duration) * 100;
                setProgress(newProgress);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 250);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <div>{toHHMMSS(currentTime)}</div>
            <div> / </div>
            <div>{toHHMMSS(duration)}</div>
        </>
    );
}

export default Timer;
