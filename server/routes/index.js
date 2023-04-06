const { feedRouter } = require('./feed.js');
const { drinkRouter } = require('./drinkView.js');
const { searchRouter } = require('./search.js');
const { customRouter } = require('./customFeed.js');
const { usersRouter } = require('./users.js');
const { brewRouter } = require('./breweryRoute.js');
const { calEntryRouter } = require('./calendarSearch.js');

module.exports = (app) => {
  app.use(`/routes/feed/`, feedRouter),
  app.use('/routes/search/', searchRouter),
  app.use('/routes/drink/', drinkRouter),
  app.use('/routes/custom/', customRouter),
  app.use('/routes/users/', usersRouter)
  app.use('/routes/beer/', brewRouter),
  app.use('/routes/calendar/', calEntryRouter);
};