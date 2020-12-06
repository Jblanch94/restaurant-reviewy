const db = require('../db/config');
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
    //find restaurant by name
    const fetchRestaurantQuery =
      'SELECT restaurant_name FROM Restaurants WHERE restaurant_name = $1';
    const restaurant = await db.query(fetchRestaurantQuery, [restaurant_name]);

    //send error response if a restaurant was found
    if (restaurant.rows.length !== 0) {
      return res.status(400).send('Restaurant already exists!');
    }

    const insertRestaurantQuery =
      'INSERT INTO Restaurants (restaurant_name, restaurant_city, restaurant_state) VALUES($1, $2, $3) RETURNING *';
    const newRestaurant = await db.query(insertRestaurantQuery, [
      restaurant_name,
      restaurant_city,
      restaurant_state,
    ]);

    res.status(201).send(newRestaurant.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchAllRestaurants = async (req, res) => {
  try {
    const query = `SELECT DISTINCT rest.*, p.avg_rating FROM restaurants rest
    JOIN reviews rev ON rev.restaurant_id = rest.restaurant_id
    JOIN (SELECT restaurant_id, AVG(stars)::integer AS avg_rating FROM reviews
    GROUP BY restaurant_id) AS p ON p.restaurant_id = rev.restaurant_id ORDER BY rest.restaurant_id`;
    const restaurants = await db.query(query);
    console.log(restaurants.rows);
    res.send(restaurants.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { createNewRestaurant, fetchAllRestaurants };
