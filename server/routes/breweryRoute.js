const { Router } = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
// const { addBarCrawl } = require('../database/helpers');
const { BarCrawl, User } = require('../database/Models')

const brewRouter = Router();

brewRouter.get('/api', (req, res) => {
  const { by_city } = req.query;

  const options = {
    method: 'GET',
    url: 'https://api.openbrewerydb.org/v1/breweries',
    params: { by_city },
  };

  axios
    .request(options)
    .then(({ data }) => {
      // console.log('HELLO', data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});


brewRouter.post('/db', (req, res) => {
  console.log(req)
  const { name, breweryList } = req.body
  // const { _id } = req.user;
  BarCrawl.replaceOne({ name: name}, {
    name: name,
    breweryList: breweryList,
    // user: _id
  },
  {upsert: true})
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log('ERROR POSTING', err);
    res.sendStatus(500);
  })


  brewRouter.get('/db', (req, res) => {
    // console.log(req);
    BarCrawl.find({})
    .then((crawls) => {
      res.send(crawls);
    })
    .catch((err) => {
      console.log('Failed GET', err)
      res.sendStatus(500);
    })
  })

  brewRouter.delete('/db', (req, res) => {
    console.log(req)

    BarCrawl.deleteOne()
  })



})

module.exports = { brewRouter };
