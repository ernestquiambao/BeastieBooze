const { Router } = require("express");
// const axios = require('axios');
const { User } = require('../database/Models');


const quizRouter = Router();

quizRouter.get('/user/:googleId', async (req, res) => {
  const { googleId } = req.params;

  try {
    const user = await User.findOne({ googleId });
    // console.log('it works!!')
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

quizRouter.post('/user/scores', async (req, res) => {
  const { googleId, score } = req.body;

  try {
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.scores.push(score);
    user.scores.sort((a, b) => b - a);
    user.scores = user.scores.slice(0, 5);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = { quizRouter };
