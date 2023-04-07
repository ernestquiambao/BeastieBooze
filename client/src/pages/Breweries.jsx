import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  InfoWindow,
  Marker,
} from 'react-google-maps';
import axios from 'axios';

const Breweries = (props) => {
  //set state with React hooks

  const [searchedCity, setCity] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [eachBrewery, setEachBrewery] = useState(null);
  const [barCrawl, setBarCrawl] = useState([]);
  const [mapPoint, setMapPoint] = useState(null);
  // console.log('WHAT UP DOG', eachBrewery);

  const requestHandler = () => {
    axios
      .get('/routes/beer/breweries', {
        params: { by_city: searchedCity },
      })
      .then(({ data }) => {
        console.log('Successful GET', data);

        let updatedData = data.map((item) => {
          if (
            item.hasOwnProperty('latitude') &&
            item.hasOwnProperty('longitude') &&
            item.latitude !== null &&
            item.longitude !== null
          ) {
            item.latitude = parseFloat(item.latitude);
            item.longitude = parseFloat(item.longitude);
            const coordinates = { lat: item.latitude, lng: item.longitude };
            return { ...item, coordinates };
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

  const handleClick = () => {

    if (eachBrewery.hasOwnProperty('coordinates')) {
      delete 'coordinates';
    }
    setBarCrawl([eachBrewery, ...barCrawl]);
    // setEachBrewery(null);
  };

  // function mouseEvents() {
  //   setMapPoint(mapPoint === null ? brewery : null);
  //   // setEachBrewery(brewery);
  // }


  // const saveBrewery = () => {
  //   const { name, address_1, city, postal_code} = eachBrewery
  //   axios.post('/routes/beer/breweries', {
  //     name: name,
  //     street: address_1,
  //     city: city,
  //     zipCode: postal_code,
  //   })
  // };

  return (
    <div>
      <div>
        <div>
          <h3>Bar Crawl</h3>
        </div>
        <div>
        {eachBrewery && (
          <div>
          {barCrawl.map((bar, index) => (
            <div key={index} >
              {/* {Object.entries(bar).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))} */}
              <div>
                <h2>{bar.name}</h2>
                <p>{bar.address_1}</p>
                <p>{bar.city}</p>
                <p>{bar.postal_code}</p>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>


      {/* <div>
        {barCrawl.map((bar, index) => (
          <div key={index} onClick={() => setEachBrewery(bar)}>
            {Object.entries(bar).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
          </div>
        ))}
      </div> */}
      </div>

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
              {breweries.map((brewery, index) => (
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

      <div
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 29.951065, lng: -90.071533 }}
        >
          {breweries.map((brewery) => (
            <Marker
              position={brewery.coordinates}

              onMouseOver={() => {
                setMapPoint(mapPoint === null ? brewery : null)
                setEachBrewery(brewery)
              }
                // setEachBrewery(eachBrewery === null ? brewery : null)
                // setEachBrewery(brewery)

              }
            />
          ))}

          {/* {eachBrewery && (
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
                <button type="button" onClick={() => handleClick()}> Add to Bar Crawl</button>
              </div>
            </InfoWindow>
            )} */}

{mapPoint && (
            <InfoWindow
              onCloseClick={() => {
                setEachBrewery(null);
              }}
              position={mapPoint.coordinates}
            >
              <div>
                <h2>{mapPoint.name}</h2>
                <p>{mapPoint.address_1}</p>
                <p>{mapPoint.city}</p>
                <p>{mapPoint.postal_code}</p>
                <button type="button" onClick={() => handleClick()}> Add to Bar Crawl</button>
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
