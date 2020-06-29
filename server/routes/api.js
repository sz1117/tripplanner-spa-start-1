const express = require('express');
const router = express.Router();
const {db, Place, Hotel, Restaurant, Activity} = require('../models/index.js')

router.get("/", async (req, res, next)=>{
  const allAttractions = {};

  allAttractions.hotels = await Hotel.findAll({ include: [{ all: true }] });
  allAttractions.restaurants = await Restaurant.findAll({ include: [{ all: true }] });
  allAttractions.activities = await Activity.findAll({ include: [{ all: true }] });

  res.json(allAttractions);
})

module.exports = router;
