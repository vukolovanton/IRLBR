import { createContext, useState } from 'react';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point, polygon } from '@turf/helpers';
import { getCoordinatesForPointFromGivenDistance } from '../utils';

export const SettingsContext = createContext({
  coordinates: [],
  handleChangeCoordinates: () => { },
  gameArea: {},
  createGameArea: () => { },
  checkIfPlayerIsInGameArea: () => { },
});

function SettingsContextProvider({ children }) {
  const [coordinates, setCoordinates] = useState(null);
  const [gameArea, setGameArea] = useState(null);

  function createGameArea() {
    if (!coordinates || coordinates.length === 0) return;
    const temp1 = getCoordinatesForPointFromGivenDistance(coordinates, 150, 0);
    const initialCoordinate = getCoordinatesForPointFromGivenDistance(temp1, 150, -90);
    const toTheRight = getCoordinatesForPointFromGivenDistance(initialCoordinate, 300, 90);
    const toTheBottom = getCoordinatesForPointFromGivenDistance(toTheRight, 300, -180);
    const toTheLeft = getCoordinatesForPointFromGivenDistance(toTheBottom, 300, -90);

    setGameArea({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            initialCoordinate,
            toTheRight,
            toTheBottom,
            toTheLeft,
            initialCoordinate
          ]
        ]
      }
    })
  }

  function checkIfPlayerIsInGameArea(playerCoordinates) {
    const playerCoordinatesToPoint = point(playerCoordinates);
    const gameAreaToPolygon = polygon(gameArea.geometry.coordinates);
    const result = booleanPointInPolygon(playerCoordinatesToPoint, gameAreaToPolygon);
    return result;
  }

  function handleChangeCoordinates(newCoordinates) {
    setCoordinates(newCoordinates);
    if (!newCoordinates) {
      setGameArea(newCoordinates);
    }
  }

  const value = {
    coordinates,
    handleChangeCoordinates,
    gameArea,
    createGameArea,
    checkIfPlayerIsInGameArea,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsContextProvider;
