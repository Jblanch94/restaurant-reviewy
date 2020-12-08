const express = require('express');

const authorization = require('../middlewares/authorization');
const adminAuthorization = require('../middlewares/adminAuthorization');
const {
  createNewRestaurant,
  fetchAllRestaurantsAndAvgRating,
  fetchAllRestaurants,
} = require('../controllers/restaurantController');

const router = express.Router();

router.post('/', authorization, adminAuthorization, createNewRestaurant);

router.get('/all-restaurants-avg-rating', fetchAllRestaurantsAndAvgRating);

router.get('/all-restaurants', fetchAllRestaurants);

module.exports = router;
