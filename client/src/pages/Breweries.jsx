import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from  'react-google-maps';
import axios from 'axios';

const Breweries = () => {
  //set state with React hooks

  const [searchedCity, setCity] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [eachBrewery, setEachBrewery] = useState(null);
  console.log('WHAT UP DOG', breweries);

  const requestHandler = () => {
    axios
      .get('/routes/beer/breweries', {
        params: { by_city: searchedCity },
      })
      .then(({ data }) => {
        console.log('Successful GET', data);

        let updatedData = data.map((item) => {
          if ((item.hasOwnProperty('latitude') && item.hasOwnProperty('longitude')) && item.latitude !== null && item.longitude !== null) {
            item.latitude = parseFloat(item.latitude);
            item.longitude = parseFloat(item.longitude);
            const coordinates = {lat: item.latitude, lng: item.longitude}
            return { ...item, coordinates};
          }
          return item;
        });
        console.log('UPDATEDDATA', updatedData);

        setBreweries(updatedData);
      })
      .catch((err) => {
        console.log('Could not GET', err);
      });
  };



  // let coordinates = {};
  return (
    <div>
      <div>
        <h3>Breweries</h3>
      </div>

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
          <div className='brewery'>
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



        <div style={{
          width: '100vw',
          height: '100vh'}}>
       <GoogleMap
         defaultZoom={10}
         defaultCenter={{lat:29.951065, lng:-90.071533}}>
           {breweries.map(brewery => (
            <Marker
            position = {brewery.coordinates}
            onMouseOver={() =>
            setEachBrewery(eachBrewery === null ? brewery : null)}

            />
     ))}
           {eachBrewery && (
      <InfoWindow
         onCloseClick={() => {
            setEachBrewery(null);
         }}
         position={eachBrewery.coordinates}
      >
        <div>
           <h2>{eachBrewery.name}</h2>
           <p>{eachBrewery.address_1}</p>
           <p>{eachBrewery.city}</p>
           <p>{eachBrewery.postal_code}</p>
           {/* <a href={liquorStore.link}>Directions</a> */}
        </div>
      </InfoWindow>
    )}
         </GoogleMap>
       </div>


       </div>


  );
};

const WrappedBreweries = withScriptjs(withGoogleMap(Breweries));

export default WrappedBreweries;

// export default Breweries;
