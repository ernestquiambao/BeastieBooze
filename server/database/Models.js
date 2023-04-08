const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
const mongoose = require('mongoose');
////////////////////////////////////////////////////////
const DATABASE = process.env.DB_NAME;
// for dev - uncomment the next line and comment out line 10
 //const dbLocation = `mongodb://localhost:27017/${DATABASE}`;
// for prod
const dbLocation = `${process.env.ATLAS_URL}/${DATABASE}`;
// const dbLocation = process.env.ATLAS_URL;
mongoose
  .connect(dbLocation, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`sucessfully connected! ${DATABASE}`);
  })
  .catch((err) => console.error('Failed to connect to database', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Adding review schema.
const ReviewSchema = new mongoose.Schema(
  {
    username: String,
    googleId: String,
    review: String,
    drinkId: Number,
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Review = mongoose.model('Review', ReviewSchema);

const UserSchema = new mongoose.Schema({
  googleId: String, // not sure if this will a string or a number, need to check once we can get data from google
  username: String,
  imageUrl: String,
  favorites: [],
  creations: [],
  scores: {
    type: [String], default:'0' // THIS IS WHAT I NEED. START EVERYBODY OFF WITH 0/20
  }
});

const DrinkSchema = new mongoose.Schema({
  name: {type:String, unique: true},
  instructions: String,
  ingredients: {},
  alcoholic: Boolean,
  createdBy: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  //add a createdBy to the drinkSchema to link to Users once created
});


const CalendarEntrySchema = new mongoose.Schema({
name: String,
date: String,
type: String,
description: String,
startTime: {type:String, unique: true },
endTime: String,
location: String,
invited: Array,
})


const BarCrawlSchema = new mongoose.Schema({
  name: String,
  breweryList: Array,
})

const User = mongoose.model('User', UserSchema);
const Drink = mongoose.model('Drink', DrinkSchema);
const CalEntry = mongoose.model('CalEntry', CalendarEntrySchema);
const BarCrawl = mongoose.model('BarCrawl', BarCrawlSchema)

const addDrink = async (drink) => {
  const { drinkName: name, instructions, ingredients, alcoholic } = drink;
  const newDrink = new Drink({
    name,
    instructions,
    ingredients,
    alcoholic,
  });
  await newDrink.save();
};

const getDrinks = async () => {
  return await Drink.find({}).exec();
};

const addCalEntry = async (entry) => {
  const newEntry = new CalEntry({
    name: entry.name,
    date: entry.date,
    type: entry.type,
    description: entry.description,
    startTime: entry.startTime,
    endTime: entry.endTime,
    location: entry.location,
    invited:[]

  });
  await newEntry.save();
};

const getCalEntry = async () => {
  return await CalEntry.find({}).exec();
};

// const addBrewery = async (brewery) => {
//   const newBrewery = new BarCrawl({
//     name: brewery.name,
//     breweryList: brewery.breweryList,
//   })
//   await newBrewery.save();
// }

module.exports = {
  User,
  Drink,
  CalEntry,
  addCalEntry,
  addDrink,
  getDrinks,
  Review,
  BarCrawl
  // addBrewery,
};
