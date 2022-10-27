import MapboxGL from '@rnmapbox/maps';
import {StyleSheet} from "react-native";

function GameAreaShape({
                           coordinates,
                           color = "lightblue",
                           ids = {
                               source: 'source',
                               fill: 'fill',
                               line: 'line'
                           }
                       }) {
    if (!coordinates) return null;
    return (
        <MapboxGL.ShapeSource id={ids.source} shape={coordinates}>
            <MapboxGL.FillLayer id={ids.fill} style={styles(color).fillLayer}/>
            <MapboxGL.LineLayer
                id={ids.line}
                style={styles(color).line}
            />
        </MapboxGL.ShapeSource>
    )
}

export default GameAreaShape;

const styles = (color) => StyleSheet.create({
    fillLayer: {
        fillColor: color,
        fillOpacity: 0.5
    },
    line: {lineColor: color === 'lightblue' ? "black" : 'transparent', lineWidth: 2}
})