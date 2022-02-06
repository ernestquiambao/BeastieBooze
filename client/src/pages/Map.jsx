import React, { useState, useEffect} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from  'react-google-maps'; 
import axios from 'axios';

//in order for map to render propeerly in app, it needs to be wrapped by a couple other functions. instead of adding a  couple of high order components, see implementation at ****
const Map = () => {
  const data = [
    {
      storeName: 'Prytania Wine & Spirits ',
      address: '1300 Arabella St, New Orleans, LA 70115',
      coordinates: {
        lat: 29.9260651,
        lng: -90.1169544
      },
    },
    {
      storeName: 'Vieux Carre Wine & Spirits',
    address: '422 Chartres St, New Orleans, LA 70130',
    coordinates: {
      lat: 29.9553593,
      lng: -90.0653627
    },},
    {
      storeName: 'Spirit Wine',
    address: '3500 Magazine St, New Orleans, LA 70115',
    coordinates: {
      lat: 29.9221002,
      lng: -90.0907571
    },},
    { 
      storeName: 'Elios Wine Warehouse',
      address: '6205 S Miro St, New Orleans, LA 70125',
      coordinates: {
        lat: 29.946678,
        lng: -90.1126738
      },
    },
    {
      storeName: 'Bradys Wine Warehouse',
      address: '1029 Oretha Castle Haley Blvd C, New Orleans, LA 70113',
      coordinates: {
        lat: 29.9449298,
        lng: -90.0768357
      },
    },
    {
      storeName: 'Everything Shoppe',
      address: '444 Canal St, New Orleans, LA 70130',
      coordinates: {
        lat: 29.9515542,
        lng: -90.0671805
      },
    },
    {
      storeName: 'Grande Krewe Fine Wine and Spirits',
      address: '2305 Decatur St, New Orleans, LA 70117',
      coordinates: {
        lat: 29.9628764,
        lng: -90.0548387
      },
    },
    {
      storeName: 'WINOshop',
      address: '201 St Charles Ave, New Orleans, LA 70170',
      coordinates: {
        lat: 29.9521265,
        lng: -90.0708795
      },
    },
    {
      storeName: 'Martin Wine Cellar New Orleans',
      address: '3827 Baronne St, New Orleans, LA 70115',
      coordinates: {
        lat: 29.9291771,
        lng: -90.0965237
      },
    },
    {
      storeName: 'Second Vine Wine',
      address: '4212 Magazine St, New Orleans, LA 70115',
      coordinates: {
        lat: 29.9207179,
        lng: -90.0994619
      },
    },
    {
      storeName: 'Esplanade Food Store',
      address: '1400 Esplanade Ave, New Orleans, LA 70116',
      coordinates: {
        lat: 29.9680353,
        lng: -90.0671956
      },
    },
  ];


  return (
    <div style={{
       width: '100vw',
       height: '100vh'}}>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{lat:29.951065, lng:-90.071533}}>
        {data.map(store => {
         return <Marker position={store.coordinates}/>
        })}
        
      </GoogleMap>
    </div>
  )
}

//**** 
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
