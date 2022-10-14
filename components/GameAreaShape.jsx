import MapboxGL from '@rnmapbox/maps';

function GameAreaShape({coordinates}) {
    if (!coordinates) return null;
    return (
        <MapboxGL.ShapeSource id="source" shape={coordinates}>
            <MapboxGL.FillLayer id="fill" style={styles.fillLayer}/>
            <MapboxGL.LineLayer
                id="line"
                style={{lineColor: "black", lineWidth: 2}}
            />
        </MapboxGL.ShapeSource>
    )
};

export default GameAreaShape;

const styles = {
    fillLayer: {
        fillColor: "lightblue",
        fillOpacity: 0.5
    }
}