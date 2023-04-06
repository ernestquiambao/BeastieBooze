const { User, Drink, Review, CalEntry } = require('./Models');

// getUser should take a userId and return the found user, empty array or null if not found?
const getUser = async (id) => {
  try {
    const user = await User.find({ googleId: id });
    return user;
  } catch (err) {
    console.log('getUser failed', err);
  }
};


// createUser should take a user object ({ googleId, username }) which should make a new user entry in the db
const createUser = async (userObj) => {
  const { googleId, givenName: username, imageUrl: imageUrl } = userObj;

  try {
    const newUser = await User.create({ googleId, username, imageUrl });
    return newUser;
  } catch (err) {
    console.log('createUser failed', err);
  }
};

const findAndUpdate = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { creations: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndUpdateFavorites = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { favorites: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndDeleteFavorites = async (id, drinkId) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $pull: { favorites: { favId: drinkId } } },
    { new: true }
  );
  return updatedUser;
};

// Adds a review to the review model with information on author, drink and review.
const addReviews = async (data) => {
  const reviewList = await Review.create({
    googleId: data.id,
    review: data.review,
    drinkId: data.drinkId,
    username: data.username,
  });
  return reviewList;
};

// Gets all reviews for a given drink id.
const findDrinkReviews = async (id) => {
  const drinkReviews = await Review.find({ drinkId: id });
  // .populate('Review')
  // .exec((err) => {
  //   console.error(err);
  // });
  return drinkReviews;
};

const getEvent = async (date, startTime, id) => {
  try {
    const event = await CalEntry.find({ date:date, startTime: startTime, user: id });
    return event;
  } catch (err) {
    console.log('getUser failed', err);
  }
};

const getEventsByDate = async (date, id) => {
  try {
    const event = await CalEntry.find({ date:date, user: id });
    return event;
  } catch (err) {
    console.log('getUser failed', err);
  }
};


const createEvent = async (entryObj) => {
  const { name, date, type, description, startTime, endTime, location, user, invited} = entryObj
  try {
    const newEvent = await CalEntry.create({ name, date, type, description, startTime, endTime, location, user, invited });
    return newEvent;
  } catch (err) {
    console.log('createNewEvent failed', err);
  }
};

const findAndUpdateEvent = async (date, startTime, data) => {
  const updatedEvent = await CalEntry.findOneAndUpdate(
    { new: true }
  );
  return updatedEvent;
};

const findAndDeleteDay = async(date, id) => {

  const deleteEvent = await CalEntry.deleteOne({ date: date, user: id });

  return deleteEvent;
}

const findAndDeleteEvent = async(date, startTime, id) => {

  const deleteEvent = await CalEntry.deleteOne({ date: date, startTime: startTime });

  return deleteEvent;
}




module.exports = {
  getUser,
  createUser,
  findAndUpdate,
  findAndUpdateFavorites,
  findAndDeleteFavorites,
  addReviews,
  findDrinkReviews,
    getEvent,
    createEvent,
    findAndUpdateEvent,
    findAndDeleteEvent,
    findAndDeleteDay,
    getEventsByDate

};
