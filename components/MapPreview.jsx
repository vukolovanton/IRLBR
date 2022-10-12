import { View, StyleSheet, Alert } from "react-native";
import MapboxGL from '@rnmapbox/maps';
import { useState, useContext } from "react";
import { SettingsContext } from "../context/settingsContext";
import { getCoordinatesForPointFromGivenDistance } from "../utils";

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

  // const coords1 = getCoordinatesForPointFromGivenDistance([37.421493, -122.083922], 500, 180);
  // const coords2 = getCoordinatesForPointFromGivenDistance([37.421493, -122.083922], 500, -180);
  // const coords3 = getCoordinatesForPointFromGivenDistance([37.421493, -122.083922], 500, 90);
  // const coords4 = getCoordinatesForPointFromGivenDistance([37.421493, -122.083922], 500, -90);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        centerCoordinate={context.coordinates}
        onPress={event => Alert.alert(event.geometry.coordinates.toString())}
      >
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={context.coordinates}
        />
        {/* <MapboxGL.PointAnnotation coordinate={temp1} /> */}
        {/* <MapboxGL.PointAnnotation coordinate={initialCoordinate} /> */}
        {/* <MapboxGL.PointAnnotation coordinate={toTheRight} /> */}
        {/* <MapboxGL.PointAnnotation coordinate={toTheBottom} /> */}
        {/* <MapboxGL.PointAnnotation coordinate={toTheLeft} /> */}

        <View>{renderAnnotations(context.coordinates)}</View>
        {context.gameArea &&
          <MapboxGL.ShapeSource id="source" shape={context.gameArea}>
            <MapboxGL.FillLayer id="fill" style={{ fillColor: "lightblue", fillOpacity: 0.5 }} />
            <MapboxGL.LineLayer
              id="line"
              style={{ lineColor: "black", lineWidth: 2 }}
            />
          </MapboxGL.ShapeSource>
        }
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
