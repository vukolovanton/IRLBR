import { createContext, useState } from 'react';

export const SettingsContext = createContext({
  coordinates: [],
  handleChangeCoordinates: () => { },
});

function SettingsContextProvider({ children }) {
  const [coordinates, setCoordinates] = useState(null);

  function handleChangeCoordinates(newCoordinates) {
    setCoordinates(newCoordinates);
  }

  const value = {
    coordinates,
    handleChangeCoordinates
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsContextProvider;
