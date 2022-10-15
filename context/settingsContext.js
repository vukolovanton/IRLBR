import {createContext, useState} from 'react';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {point, polygon} from '@turf/helpers';
import {getCoordinatesForPointFromGivenDistance} from '../utils';
import {trimCoordinates} from "../utils/utils";

export const SettingsContext = createContext({
    coordinates: [],
    handleChangeCoordinates: () => {
    },
    gameArea: {},
    startTime: '',
    createGameArea: () => {
    },
    checkIfPlayerIsInGameArea: () => {
    },
    setNewGameDetails: ({newRoundTime, newDistance, newStartTime}) => {},
});

function SettingsContextProvider({children}) {
    const [coordinates, setCoordinates] = useState(null);
    const [gameArea, setGameArea] = useState(null);
    const [roundTime, setRoundTime] = useState(null);
    const [distance, setDistance] = useState(null);
    const [startTime, setStartTime] = useState(null);

    function setNewGameDetails({newRoundTime, newDistance, newStartTime}) {
        setRoundTime(newRoundTime);
        setDistance(newDistance);
        setStartTime(newStartTime);
    }

    function createGameArea(options) {
        if (options?.clear) {
            setGameArea(null);
            return;
        }
        if (!coordinates || coordinates.length === 0) return;
        const temp1 = getCoordinatesForPointFromGivenDistance(coordinates, Math.round(distance / 2), 0);
        const initialCoordinate = getCoordinatesForPointFromGivenDistance(temp1, Math.round(distance / 2), -90);
        const toTheRight = getCoordinatesForPointFromGivenDistance(initialCoordinate, distance, 90);
        const toTheBottom = getCoordinatesForPointFromGivenDistance(toTheRight, distance, -180);
        const toTheLeft = getCoordinatesForPointFromGivenDistance(toTheBottom, distance, -90);

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

    function handleChangeCoordinates(newCoordinates, trim) {
        setCoordinates(trim ? trimCoordinates(newCoordinates) : newCoordinates);
        if (!newCoordinates) {
            setGameArea(null);
        }
    }

    const value = {
        coordinates,
        handleChangeCoordinates,
        gameArea,
        startTime,
        createGameArea,
        checkIfPlayerIsInGameArea,
        setNewGameDetails,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
