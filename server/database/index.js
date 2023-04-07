const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD } = process.env;
const mongoUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@pimpc.makmqkr.mongodb.net/?retryWrites=true`

console.log({ DB_USERNAME, DB_PASSWORD });

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true

  });

module.exports = {
  db,
  Models: require('./Models.js')
};