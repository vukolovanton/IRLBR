import {Text, View} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo, useContext} from "react";
import {SettingsContext} from "../context/settingsContext";

function Timer({ callback }) {
    const context = useContext(SettingsContext);
    const { hours, minutes, seconds } = useTimer(context.startTime, callback);

    return (
        <View>
            <Text>Timer: {twoDigits(hours)}:{twoDigits(minutes)}:{twoDigits(seconds)}</Text>
        </View>
    )
}

export default memo(Timer);

const twoDigits = (num) => String(num).padStart(2, '0')