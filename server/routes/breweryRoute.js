const { Router } = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const { addBrewery } = require('../database/helpers');

const brewRouter = Router();

brewRouter.get('/breweries', (req, res) => {
  const { by_city } = req.query;

  const options = {
    method: 'GET',
    url: 'https://api.openbrewerydb.org/v1/breweries',
    params: { by_city },
  };

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


brewRouter.post('/breweries', (req, res) => {
  console.log(req)
})

module.exports = { brewRouter };
