import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from  'react-google-maps';
import axios from 'axios';

const Breweries = () => {
  //set state with React hooks

  const [searchedCity, setCity] = useState(null);
  const [breweries, setBreweries] = useState([]);
  console.log('WHAT UP DOG', breweries);

  const requestHandler = () => {
    axios
      .get('/routes/beer/breweries', {
        params: { by_city: searchedCity },
      })
      .then((response) => {
        console.log('Successful GET', response);

        setBreweries(response.data);
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
          <div>
            <label>Search City</label>
            <input onChange={(event) => setCity(event.target.value)}></input>
          </div>
          <div>
            <button type='button' onClick={(event) => requestHandler(event)}>
              Find Breweries
            </button>
          </div>
          <div className="brewery">
            {breweries.map((brewery) => (
              <ul key={brewery.id}>
                {brewery.name}
                {/* <li>{brewery.brewery_type}</li> */}
                <li>{brewery.address_1}</li>
                <li>{brewery.city}</li>
                <li>{brewery.postal_code}</li>
                <li>{brewery.phone}</li>
                {/* <li>{brewery.website_url}</li> */}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// const WrappedBreweries = withScriptjs(withGoogleMap(Breweries));

export default Breweries;
// export default WrappedBreweries;
