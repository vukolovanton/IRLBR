import {useState, useEffect, useRef} from "react";
import BackgroundTimer from 'react-native-background-timer';

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function useTimer(deadline, callback) {
    const [timespan, setTimespan] = useState(new Date(deadline) - Date.now());
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = BackgroundTimer.setInterval(() => {
            setTimespan((_timespan) => _timespan - SECOND);
        }, SECOND);

        return () => {
            BackgroundTimer.clearInterval(intervalRef.current);
        };
    }, [SECOND, deadline]);

    /* If the initial deadline value changes */
    useEffect(() => {
        setTimespan(new Date(deadline) - Date.now());
    }, [deadline]);

    useEffect(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            BackgroundTimer.clearInterval(intervalRef.current);
            callback();
        }
    }, [timespan]);

    const hours = Math.floor((timespan / HOUR) % 24);
    const minutes = Math.floor((timespan / MINUTE) % 60);
    const seconds = Math.floor((timespan / SECOND) % 60);

    return {
        hours,
        minutes,
        seconds,
    };
}