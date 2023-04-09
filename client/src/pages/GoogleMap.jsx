import React, { useState } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService, LatLng } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMapDirections = () => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  const directionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
      setIsLoading(false)
    } else {
      setError('Directions request failed due to ' + status);
    }
    setIsLoading(false);
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const loader = new Loader({
    apiKey: "AIzaSyBJbqpVzrxAa91WCUv6Y0GdKOjkSN3rEC8",
    version: 'weekly',
    libraries: ['places'],
  });

  //    Getting directions from Rusty Nail to Home
  const getDirections = () => {
    const directionService = new window.google.maps.DirectionsService();
    const rustyNail = new window.google.maps.LatLng(29.940914305487873, -90.06928203181762);
    const homeFourth = new window.google.maps.LatLng(29.923936587036795, -90.08069751330405);
    const directionsRequest = {
      origin: rustyNail,
      destination: homeFourth,
      travelMode: 'WALKING',
    }
    directionService.route(directionsRequest, directionsCallback);
  }


  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
        onLoad={(map) => console.log('Map:', map)}
        onUnmount={(map) => console.log('Map has been unmounted', map)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    );
  };

  if (isLoading) {
    loader.load().then(() => {setIsLoading(false);
    getDirections()});
    return <div>Loading...</div>;
  }

  return renderMap();
};

export default GoogleMapDirections;
