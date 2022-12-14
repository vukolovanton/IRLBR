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
    originalGameArea: {},
    distance: '',
    startTime: '',
    roundTime: '',
    createGameArea: (width, coordinates, options) => {
    },
    checkIfPlayerIsInGameArea: (playerCoordinates) => {
    },
    setNewGameDetails: ({newRoundTime, newDistance, newStartTime}) => {
    },
    offsetGameArea: () => {
    },
    offsetData: [],
    setOffsetData: () => {
    },
    clearAllData: () => {},
});

function SettingsContextProvider({children}) {
    const [coordinates, setCoordinates] = useState(null);
    const [gameArea, setGameArea] = useState(null);
    const [originalGameArea, setOriginalGameArea] = useState(null);
    const [roundTime, setRoundTime] = useState(null);
    const [distance, setDistance] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [offsetData, setOffsetData] = useState(null);

    function setNewGameDetails({newRoundTime, newDistance, newStartTime}) {
        setRoundTime(newRoundTime);
        setDistance(newDistance);
        setStartTime(newStartTime);
    }

    function createGameArea(width, targetCoordinates, options) {
        if (options?.clear) {
            setGameArea(null);
            return;
        }

        if (!targetCoordinates || targetCoordinates.length === 0) return;
        const temp1 = getCoordinatesForPointFromGivenDistance(targetCoordinates, Math.round(width / 2), 0);
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
        });

        if (options?.setOriginalGameArea) {
            setOriginalGameArea({
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
            });
        }
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

    function offsetGameArea(index) {
        setDistance(offsetData[index].distance);
        setCoordinates(offsetData[index].coordinates);
        createGameArea(offsetData[index].width, offsetData[index].coordinates);
    }

    function clearAllData() {
        setCoordinates(null);
        setGameArea(null);
        setOriginalGameArea(null);
        setRoundTime(null);
        setDistance(null);
        setStartTime(null);
        setOffsetData(null);
    }

    const value = {
        coordinates,
        handleChangeCoordinates,
        gameArea,
        originalGameArea,
        distance,
        startTime,
        roundTime,
        createGameArea,
        checkIfPlayerIsInGameArea,
        setNewGameDetails,
        offsetGameArea,
        offsetData,
        setOffsetData,
        clearAllData,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
