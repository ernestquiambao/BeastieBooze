require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routes/index.js');
// const mongoose = require('mongoose');
const { BarCrawl } = require('./database/Models')


const PORT = 8001;
const DIST_DIR = path.resolve(__dirname, '..', 'client/dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

router(app);

app.get('/routes/breweries/db', (req, res) => {
  BarCrawl.find({})
    .then((crawls) => {
      res.send(crawls);
    })
    .catch((err) => {
      console.log('Failed GET', err)
      res.sendStatus(500);
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening at: http://localhost:${PORT}`);
});
