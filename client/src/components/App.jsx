// table of contents
// renders all of our different views
// view switcher - main, single drink, create, profile, login/signup buttons, search

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Create from '../pages/Create';
import Feed from '../pages/Feed';
import DrinkView from '../pages/DrinkView';
import Login from '../components/Login';
import Search from '../pages/Search';
import CustomFeed from '../pages/CustomFeed';
import CustomDrinkView from '../pages/CustomDrinkView';
import Profile from '../pages/Profile';
import WrappedMap from '../pages/Map.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {

  // using react router to conditionally render views

  return (
  <GoogleOAuthProvider clientId="457646205065-4askqot96hvs0fjovvbltcigm32sded9.apps.googleusercontent.com">
      <div className="app-body">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Feed} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/search' component={Search} />
          <Route path='/login' component={Login} />
          <Route path='/profile/:userId' component={Profile} />
          <Route path='/drink/:drinkId' component={DrinkView} />  {/* // takes a param and dynamically renders a drinkView */}
          <Route exact path='/custom' component={CustomFeed} />
          <Route path='/custom/:drinkId' component={CustomDrinkView} />
          <Route path='/map' >
            <div style={{width: '100vw', height: '100vh'}}>
            <WrappedMap  
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAkS-j4nr_o5bz4wUV8Dm9Dk-2rLHJp7nA`} loadingElement={<div style={{height:"100%"}} />}
            containerElement={<div style={{height:"100%"}} />}
            mapElement={<div style={{height:"100%"}} />} />
            </div>
          </Route>
        </Switch>
      </div>
  </GoogleOAuthProvider>
    
  );

};

export default App;