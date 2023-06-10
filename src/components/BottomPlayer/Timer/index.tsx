import {Typography} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {toHHMMSS} from '../../../utils/Functions';
import {playerStateInterface} from '../../../containers/Body/types';

interface TimerProps {
    playerState: playerStateInterface;
}

const Timer: React.FC<TimerProps> = ({playerState}) => {
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                if (playerState.player?.playerInfo.duration !== undefined && progress === 0) {
                    setDuration(playerState.player.playerInfo.duration);
                }

                if (playerState.player?.playerInfo.currentTime !== undefined) {
                    setCurrentTime(playerState.player.playerInfo.currentTime);
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
        <div className="timer-wrapper">
            <Typography variant="body2" color="text.secondary" align="right">
                {toHHMMSS(currentTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                /
            </Typography>
            <Typography variant="body2" color="text.secondary" align="left">
                {toHHMMSS(duration)}
            </Typography>
        </div>
    );
};

export default Timer;
