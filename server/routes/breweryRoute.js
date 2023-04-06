const { Router } = require('express');
// const router = require('express').Router();
const dotenv = require('dotenv');
const axios = require('axios');
// const stringify = require('json-stringify-safe');

// dotenv.config();

const brewRouter = Router();

brewRouter.get('/breweries', (req, res) => {
  const { by_city } = req.query;

  // console.log('HELLLOOOOO', req);

  const options = {
    method: 'GET',
    url: 'https://api.openbrewerydb.org/v1/breweries',
    params: { by_city },
  };

  // const options = {
  //   method: 'GET',
  //   url: 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries',
  //   params: {by_state: 'NY'},
  //   headers: {
  //     'X-RapidAPI-Key': '2cbdb847d2mshd5b48913e0fb840p1e26a6jsnb4b7f045b962',
  //     'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
  //   }
  // };

  axios
    .request(options)
    .then(({ data }) => {
      console.log('HELLO', data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = { brewRouter };
