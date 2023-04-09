const { Router } = require("express");
// const axios = require('axios');
const { User } = require('../database/Models');


const quizRouter = Router();

quizRouter.get('/user/:googleId', (req, res) => {
  const { googleId } = req.params;

  User.findOne({ googleId })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }

      res.send(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

quizRouter.post('/user/scores', (req, res) => {
  const { googleId, score } = req.body;

  User.findOne({ googleId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.scores.push(score);
      user.scores.sort((a, b) => b - a);
      user.scores = user.scores.slice(0, 5);
      return user.save();
    })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});


module.exports = { quizRouter };
