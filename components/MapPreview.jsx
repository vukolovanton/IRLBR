import { View, StyleSheet } from "react-native";
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken('pk.eyJ1IjoiYWJzdHJhY2F0OTIiLCJhIjoiY2w5MnR5Zm1oMDZpYzQxbzdkczZ4bnA0aCJ9.isqiF7V8O4ThePVchqsMfw');

function MapPreview() {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} />
    </View>
  )
}

export default MapPreview;

const styles = StyleSheet.create({
  container: {
    height: 500,
    // width: 300,
  },
  map: {
    flex: 1
  }
});
