// import React, { useState } from 'react';
// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   InfoWindow,
//   Marker,
// } from 'react-google-maps';

// const MapHandler = ({breweries, setBreweries, eachBrewery, setEachBrewery, barCrawl, setBarCrawl}) => {

//   const [mapPoint, setMapPoint] = useState(null);

//   const handleClick = () => {
//       if (eachBrewery.hasOwnProperty('coordinates')) {
//           delete 'coordinates';
//       }
//       setBarCrawl([eachBrewery, ...barCrawl]);
//   };

//   return (
//       <div
//       style={{
//         width: '100vw',
//         height: '100vh',
//       }}
//     >
//       <GoogleMap
//         defaultZoom={12}
//         defaultCenter={{ lat: 29.951065, lng: -90.071533 }}
//         // ref={(map) => handleMapMounted(map)}
//       >
//         {breweries.map((brewery) => (
//           <Marker
//             position={brewery.coordinates}
//             onMouseOver={() => {
//               setMapPoint(mapPoint === null ? brewery : null)
//               setEachBrewery(brewery)
//             }}
//           />
//         ))}

//         {mapPoint && (
//           <InfoWindow
//             onCloseClick={() => {
//               setEachBrewery(null);
//             }}
//             position={mapPoint.coordinates}
//           >
//             <div>
//               <h2>{mapPoint.name}</h2>
//               <p>{mapPoint.address_1}</p>
//               <p>{mapPoint.city}</p>
//               <p>{mapPoint.postal_code}</p>
//               <button type="button" onClick={() => handleClick()}> Add to Bar Crawl</button>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// const WrappedBreweries = withScriptjs(withGoogleMap(MapHandler));
// export default WrappedBreweries;