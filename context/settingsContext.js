import { createContext, useState } from 'react';

export const SettingsContext = createContext({
  myLocation: [],
  enteredLocation: [],
});

function SettingsContextProvider({ children }) {
  const [myLocation, setMyLocation] = useState([]);
  const [enteredLocation, setEnteredLocation] = useState([]);

  const value = {
    myLocation,
    setMyLocation,
    enteredLocation,
    setEnteredLocation,
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsContextProvider;
