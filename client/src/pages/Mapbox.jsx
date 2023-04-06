import React, { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import "regenerator-runtime/runtime";


//  add to readme:
/*
npm install npm install use-places-autocomplete --legacy-peer-deps
npm install @reach/combobox --legacy-peer-deps
npm install style-loader
npm install css-loader
npm install regenerator-runtime --legacy-peer-deps

*/


const Mapbox = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJbqpVzrxAa91WCUv6Y0GdKOjkSN3rEC8",
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};
function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <GoogleMap
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        mapContainerClassName='map-container'
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({address});
    const {lat, lng} = await getLatLng(result[0]);
    setSelected({ lat, lng });
  }
  return <Combobox onSelect={handleSelect}>
    <ComboboxInput value={ value } onChange={(e) => setValue(e.target.value)} disabled={!ready}
    className='combobox-input' placeholder='Enter Address'/>
    <ComboboxPopover>
      <ComboboxList>
        {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
      </ComboboxList>
    </ComboboxPopover>
  </Combobox>
}

export default Mapbox;
