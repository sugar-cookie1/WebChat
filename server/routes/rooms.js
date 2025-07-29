const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/user/:username/recent-rooms', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ rooms: user.rooms });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent rooms", error: err });
  }
});

module.exports = router;
