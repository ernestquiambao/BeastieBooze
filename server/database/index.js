const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD } = process.env;
// const mongoUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.r3e81.mongodb.net/beastie-booze`;
const mongoUri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.fk0zvoe.mongodb.net/?retryWrites=true&w=majority`
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