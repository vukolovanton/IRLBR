import {Text, View} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo, useContext} from "react";
import {SettingsContext} from "../context/settingsContext";

function Timer() {
    const context = useContext(SettingsContext);
    const { hours, minutes, seconds } = useTimer(context.startTime);

    return (
        <View>
            <Text>Timer: {hours}:{minutes}:{seconds}</Text>
        </View>
    )
}

export default memo(Timer);