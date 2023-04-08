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


module.exports = { quizRouter };
