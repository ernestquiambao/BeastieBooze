const { Router } = require("express");
// const router = require('express').Router();
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const brewRouter = Router();

brewRouter.get(('/breweries', (req, res) => {

  console.log('HELLLOOOOO', req);

  // const options = {
  //   method: 'GET',
  //   url: 'https://api.openbrewerydb.org/v1/breweries',
  //   params: {by_city: 'new_orleans'},
  //  
  // };


  const options = {
    method: 'GET',
    url: 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries',
    params: {by_state: 'NY'},
    headers: {
      'X-RapidAPI-Key': '2cbdb847d2mshd5b48913e0fb840p1e26a6jsnb4b7f045b962',
      'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
    }
  };

  axios.request(options)
    .then(function (response) {
      console.log(response.data);
      res.status(200).send(response);
     })
    .catch(function (error) {
      console.error(error);
      res.sendStatus(500);
  });

}))

module.exports = {brewRouter};

