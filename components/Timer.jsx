import {Text, View} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo} from "react";

function Timer({ time, callback }) {
    const { hours, minutes, seconds } = useTimer(time, callback);

    return (
        <View>
            <Text>{twoDigits(hours)}:{twoDigits(minutes)}:{twoDigits(seconds)}</Text>
        </View>
    )
}

export default memo(Timer);

const twoDigits = (num) => String(num).padStart(2, '0')