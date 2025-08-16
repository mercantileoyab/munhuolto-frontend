import React, { useContext, useEffect, useState } from "react";
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import '../styles/style.css';
import locationContext from "../context/locationContext";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PlaceIcon from '@mui/icons-material/Place';
import workshopContext from "../context/workshopContext";
import { useWindowSize } from "../hooks/useWindowSize";

const helsinki = {
  lat: 60.1695, // Helsinki
  lng: 24.9354
};

export default function Map() {

  const { state: locationState } = useContext(locationContext);
  const { state: workshopState } = useContext(workshopContext);

  const { isDesktop } = useWindowSize();

  const [ center, setCenter ] = useState({})

  // const radius = 50000;

  useEffect(() => {
    if (locationState.location) {
      setCenter({ lat: locationState.location.lat, lng: locationState.location.lng });
    } else {
      setCenter(helsinki);
    } 
  }, [ locationState.location ]);


  const containerStyle = {
    width: '100%',
    height: isDesktop ? '650px' : '400px',
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="map">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {/* Add markers or other components here if needed */}
            
            {/* User location marker */}
            { locationState.location && (
              <Marker 
                position={locationState.location}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
                // icon={{
                //   url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                //   scaledSize: new window.google.maps.Size(30, 30)
                // }}
              />
            )}

            { workshopState?.workshops && workshopState?.workshops.map((workshop, index) => (
              <Marker
                key={index}
                position={{ lat: workshop.location.lat, lng: workshop.location.lng }}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
                onClick={() => {
                  // Handle marker click
                  console.log("Workshop clicked:", workshop);
                }}
              />
            ))}

            {/* Add circle around the user location */}
            {/* { locationState.location && (
              <Circle
                center={locationState.location}
                radius={radius}
                options={{
                  fillColor: "lightgrey",
                  fillOpacity: 0.2,
                  strokeColor: "grey",
                  strokeOpacity: 0.5,
                  strokeWeight: 1,
                }}
              />
            )} */}


        </GoogleMap>
    </div>
  );
}
