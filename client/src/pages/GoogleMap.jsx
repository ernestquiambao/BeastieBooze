import React, { useState } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMapDirections = () => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const directionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
    } else {
      setError('Directions request failed due to ' + status);
    }
    setIsLoading(false);
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
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
    loader.load().then(() => setIsLoading(false));
    return <div>Loading...</div>;
  }

  return renderMap();
};

export default GoogleMapDirections;
