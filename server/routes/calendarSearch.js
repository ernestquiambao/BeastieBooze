const { Router } = require('express');
const { CalEntry } = require('../database/Models');
const {
  getEvent,
  createEvent,
  findAndUpdateEvent,
  findAndDeleteEvent,
  findAndDeleteDay,
  getEventsByDate
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



calEntryRouter.put('/events/:id', (req, res) => {
    const { event } = req.body;
    const { id } = req.params;
    //find the task document by id
    console.log(req);

    CalEntry.findByIdAndUpdate(id, event, { returnDocument: 'after'})
      .then((eventObj) => {
      //If found and updated, send st 200
      // If not found, send st 404
        if (eventObj) {
          // if found and updated
        //  console.log('Achieved to FIND & UPDATE a event', taskObj);
          res.sendStatus(200);
        } else {
          // if not found, send st 404(data is null)
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        // console.error('Failed to FIND & UPDATE a event', err);
        res.sendStatus(500);
      });
  // Log the error && send st 500
  });

// deletes all events for a day
calEntryRouter.delete('/events/:date', (req, res) => {
  const { date } = req.params
  findAndDeleteDay(date)
    .then((data) => {
      if(!data){
        console.log('able to delete:', data)
      res.status(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

calEntryRouter.delete('/events/:date', (req, res) => {
  const { date } = req.params
  const { startTime } = req.startTime
  CalEntry.deleteOne({ date: date, startTime: startTime })
  .then(({ deletedCount }) => {
    if (deletedCount) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.log('Failed to DELETE', err);
    res.sendStatus(500);
  })
});


// Gets all entries for a given date for a user
calEntryRouter.get('/events/:date', (req, res) => {
  const { date } = req.params;
  console.log(date);
getEventsByDate(date)
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
