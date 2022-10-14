import {Text, View} from "react-native";
import useTimer from "../hooks/useTimer";
import {memo} from "react";

function Timer() {
    const { hours, minutes, seconds } = useTimer("2022-12-31T23:59:59");
    return (
        <View>
            <Text>Timer</Text>
        </View>
    )
}

export default memo(Timer);