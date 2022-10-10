import { View, Text, Button } from "react-native";

function Map({ navigation }) {
  return (
    <View>
      <Text>Map View</Text>
      <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
    </View>
  )
}

export default Map;
