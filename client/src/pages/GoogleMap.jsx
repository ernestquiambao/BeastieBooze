import React, { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMapDirections = () => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        error => setError(error.message)
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const directionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
    } else {
      setError('Directions request failed due to ' + status);
    }
    setIsLoading(false);
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        options={options}
        onLoad={(map) => console.log('Map:', map)}
        onUnmount={(map) => console.log('Map has been unmounted', map)}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    );
  };

  const getDirections = () => {
    const directionService = new window.google.maps.DirectionsService();
    const end = new window.google.maps.LatLng(29.963280989903282, -90.05199237099808);
    const directionsRequest = {
      origin: currentLocation,
      destination: end,
      travelMode: 'WALKING',
    }
    directionService.route(directionsRequest, directionsCallback);
  }

  useEffect(() => {
    if (currentLocation) {
      loader.load().then(() => {
        setIsLoading(false);
        getDirections();
      });
    }
  }, [currentLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return renderMap();
};

export default GoogleMapDirections;
