import { View, StyleSheet } from "react-native";
import MapboxGL from '@rnmapbox/maps';
import { useContext } from "react";
import { SettingsContext } from "../context/settingsContext";

MapboxGL.setAccessToken('pk.eyJ1IjoiYWJzdHJhY2F0OTIiLCJhIjoiY2w5MnR5Zm1oMDZpYzQxbzdkczZ4bnA0aCJ9.isqiF7V8O4ThePVchqsMfw');

const renderAnnotations = (annotationCoordinate) => {
  if (!annotationCoordinate) return null;
  return (
    <MapboxGL.PointAnnotation
      key="pointAnnotation"
      id="pointAnnotation"
      coordinate={annotationCoordinate}
    >
      <View
        style={{
          height: 15,
          width: 15,
          backgroundColor: "red",
          borderRadius: 50,
          borderColor: "#fff",
          borderWidth: 3,
        }}
      />
    </MapboxGL.PointAnnotation>
  );
};

function MapPreview() {
  const context = useContext(SettingsContext);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        centerCoordinate={context.coordinates}
      // onPress={event => setCoordinates(event.geometry.coordinates)}
      >
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={context.coordinates}
        />
        {/* <MapboxGL.PointAnnotation coordinate={context.coordinates} /> */}
        <View>{renderAnnotations(context.coordinates)}</View>
      </MapboxGL.MapView>
    </View>
  )
}

export default MapPreview;

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  map: {
    flex: 1
  }
});
