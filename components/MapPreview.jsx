import {View, StyleSheet} from "react-native";
import MapboxGL from '@rnmapbox/maps';

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

function MapPreview({centerCoordinate, onLongPress, hideMainAnnotation = false, children}) {
    return (
        <MapboxGL.MapView
            style={styles.map}
            centerCoordinate={centerCoordinate}
            onLongPress={onLongPress}
            rotateEnabled={false}
        >
            <MapboxGL.Camera
                zoomLevel={12}
                centerCoordinate={centerCoordinate}
            />
            {
                !hideMainAnnotation && <View>{renderAnnotations(centerCoordinate)}</View>
            }
            {children}
        </MapboxGL.MapView>
    )
}

export default MapPreview;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
