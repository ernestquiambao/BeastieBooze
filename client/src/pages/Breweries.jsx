import React, { useState } from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from  'react-google-maps';
import axios from 'axios';

const Breweries = () => {
  //set state with React hooks

  // const [brewery, setBrewery] = useState(null);

  const requestHandler = () => {
    axios
      .get('/beer/breweries', {
        params: { by_state: 'NY' },
      })
      .then((response) => {
        console.log('Successful GET', response);
      })
      .catch((err) => {
        console.log('Could not GET', err);
      });
  };

  return (
    <div>
      <h3>Find Breweries</h3>
      <div>
        <div>
          <div></div>
        </div>
        <button type='button' onClick={(event) => requestHandler(event)}>
          Find Breweries
        </button>
      </div>
    </div>
  );
};

// const WrappedBreweries = withScriptjs(withGoogleMap(Breweries));

export default Breweries;
// export default WrappedBreweries;
