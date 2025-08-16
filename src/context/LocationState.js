import { useEffect, useReducer } from "react";
import locationReducer from "./locationReducer";
import locationContext from "./locationContext";

const helsinki = {
  lat: 60.1695,
  lng: 24.9354
};

export default function LocationState({ children}) {

  const [state, dispatch] = useReducer(locationReducer, {
    location: null,
    locationAddress: null,
  });

  useEffect(() => {
    // if (!state.location && !state.locationAddress) {
    //   setStartLocation();
    // }
  }, []);

  // Set location and location address in beginning
  const setStartLocation = () => {
    const params = new URLSearchParams({ lat: helsinki.lat, lng: helsinki.lng }).toString();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/google-maps/address?${params}`)
        .then((response) => response.json())
        .then((data) => {
            dispatch({ type: "SET_LOCATION", payload: helsinki });
            dispatch({ type: "SET_LOCATION_ADDRESS", payload: data });
        })
        .catch((error) => {
            console.error("Error fetching address:", error);
        });
  };


  const setLocation = (location) => {
    dispatch({ type: "SET_LOCATION", payload: location });
  };
  const setLocationAddress = (locationAddress) => {
    dispatch({ type: "SET_LOCATION_ADDRESS", payload: locationAddress });
  };
  const emptyLocation = () => {
    dispatch({ type: "EMPTY_LOCATION" });
  };

  return (
    <locationContext.Provider value={{ state, setLocation, setLocationAddress, emptyLocation }}>
      {children}
    </locationContext.Provider>
  );
}