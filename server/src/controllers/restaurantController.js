const Restaurant = require('../models/Restaurant');
const RestaurantService = require('../services/RestaurantService');
const checkParams = require('../utils/validation/checkParams');

const createNewRestaurant = async (req, res) => {
  const { restaurant_name, restaurant_city, restaurant_state } = req.body;
  //check if any params were not supplied
  const validParams = checkParams({
    restaurant_name,
    restaurant_city,
    restaurant_state,
  });
  if (!validParams) {
    return res.send('Missing Restaurant Information!');
  }

  try {
    const restaurant = new Restaurant(req.body);
    const restaurantService = new RestaurantService();
    const newRestaurant = await restaurantService.createNewRestaurant(
      restaurant
    );
    console.log('new restaurant', newRestaurant);
    if (newRestaurant.type === 'error') {
      throw newRestaurant;
    }
    res.status(201).send(newRestaurant.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
  }
};

const fetchAllRestaurantsAndAvgRating = async (req, res) => {
  try {
    const restaurantService = new RestaurantService();
    const restaurants = await restaurantService.fetchAllRestaurantsAndAvgRating();
    console.log(restaurants);
    res.send(restaurants.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchAllRestaurants = async (req, res) => {
  try {
    const restaurantService = new RestaurantService();
    const restaurants = await restaurantService.fetchAllRestaurants();
    res.send(restaurants.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createNewRestaurant,
  fetchAllRestaurantsAndAvgRating,
  fetchAllRestaurants,
};
