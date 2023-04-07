const { Router } = require('express');
const { CalEntry } = require('../database/Models');
const {
  getEvent,
  createEvent,
  findAndUpdateEvent,
  findAndDeleteEvent
} = require('../database/helpers')

const axios = require('axios');



const calEntryRouter = Router();


// creates an event
calEntryRouter.get('/events', async (req, res) => {
  const { time, date } = req.query;
  const existingEntry = await getEvent(time, date);

  if (existingEntry.length) {
    res.status(201).send(existingEntry[0]);
  } else if (!existingUser.length) {
    createEvent(req.query)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        // console.log('error creating user', err);
        res.sendStatus(500);
      });
  } else {
    // console.log('not found');
    res.sendStatus(404);
  }
});



calEntryRouter.put('/events/:date', (req, res) => {
  const { id, date, time } = req.params;
  findAndUpdateEvent(id, date, time)
    .then((data) => {
      console.log('updated calendar event:', data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// adds a calendar entry
calEntryRouter.delete('/events/:date', (req, res) => {
  const EntryObj = req.body;
  findAndDeleteEvent(EntryObj)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Gets all entries for a given date for a user
calEntryRouter.get('/events/:date', (req, res) => {
  const { date } = req.params;
getEvent(date)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

calEntryRouter.post('/events', (req, res) => {
  const eventObj = req.body
  createEvent(eventObj)
    .then((eventObj) => {
      res.status(201).send(eventObj);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
 });


module.exports = { calEntryRouter };
