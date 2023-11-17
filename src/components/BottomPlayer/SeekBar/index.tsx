import {Slider} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import {toHHMMSS} from '../../../utils/Functions';
import {playerStateInterface} from '../../../containers/Body/types';

interface SeekBarProps {
    playerState: playerStateInterface;
}

const SeekBar: React.FC<SeekBarProps> = ({playerState}) => {
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleInputChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            playerState.player.seekTo(value);
        }
    };

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
        <Slider
            className="seek-bar"
            value={currentTime}
            min={0}
            max={duration}
            color="secondary"
            onChange={handleInputChange}
            valueLabelDisplay="auto"
            valueLabelFormat={toHHMMSS}
        ></Slider>
    );
};

export default SeekBar;
