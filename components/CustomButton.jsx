import {TouchableOpacity, StyleSheet, Text, ActivityIndicator} from "react-native";
import {memo} from 'react';
import {COLORS} from "../utils/constants";

function CustomButton({title, onPress, color = COLORS.MAIN, isLoading = false}) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles(color).button}
        >
            <Text style={styles().title}>{title.toUpperCase()}</Text>
            {isLoading && <ActivityIndicator style={styles().loading} color="white" />}
        </TouchableOpacity>
    )
}

export default memo(CustomButton);

const styles = (color) => StyleSheet.create({
    button: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: color,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    loading: {
        marginLeft: 10,
    }
})