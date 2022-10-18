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
    distance: '',
    startTime: '',
    roundTime: '',
    createGameArea: () => {
    },
    checkIfPlayerIsInGameArea: (playerCoordinates) => {
    },
    setNewGameDetails: ({newRoundTime, newDistance, newStartTime}) => {},
    shrinkGameArea: () => {},
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

    function createGameArea(width, options) {
        if (options?.clear) {
            setGameArea(null);
            return;
        }

        if (!coordinates || coordinates.length === 0) return;
        const temp1 = getCoordinatesForPointFromGivenDistance(coordinates, Math.round(width / 2), 0);
        const initialCoordinate = getCoordinatesForPointFromGivenDistance(temp1, Math.round(width / 2), -90);
        const toTheRight = getCoordinatesForPointFromGivenDistance(initialCoordinate, width, 90);
        const toTheBottom = getCoordinatesForPointFromGivenDistance(toTheRight, width, -180);
        const toTheLeft = getCoordinatesForPointFromGivenDistance(toTheBottom, width, -90);

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

    function shrinkGameArea() {
        const newDistance = Math.round(distance / 2);
        setDistance(newDistance);
        createGameArea(newDistance)
    }

    const value = {
        coordinates,
        handleChangeCoordinates,
        gameArea,
        distance,
        startTime,
        roundTime,
        createGameArea,
        checkIfPlayerIsInGameArea,
        setNewGameDetails,
        shrinkGameArea,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
