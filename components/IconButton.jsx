import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {memo} from 'react';
import {COLORS} from "../utils/constants";

function IconButton({title, onPress, color = COLORS.MAIN}) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles(color).button}
        >
            <Text style={styles().title}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}

export default memo(IconButton);

const styles = (color) => StyleSheet.create({
    button: {
        backgroundColor: color,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 28,
    },
    loading: {
        marginLeft: 10,
    }
})