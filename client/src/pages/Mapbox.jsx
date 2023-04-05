import React from 'react';
import ReactMapGL from 'react-map-gl';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
//  AIzaSyBJbqpVzrxAa91WCUv6Y0GdKOjkSN3rEC8
//  add mapbox token when it arrives (ernest)
const Mapbox = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyBJbqpVzrxAa91WCUv6Y0GdKOjkSN3rEC8",
  })

  if(!isLoaded) return <div>Loading...</div>
  return (
<Map />
  );
};
function Map() {
  return <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container"></GoogleMap>
}

export default Mapbox;
