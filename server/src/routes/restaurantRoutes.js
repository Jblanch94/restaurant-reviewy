const express = require("express");

const db = require("../db/config");
const authorization = require("../middlewares/authorization");
const adminAuthorization = require("../middlewares/adminAuthorization");

const router = express.Router();

router.post("/", authorization, adminAuthorization, async (req, res) => {
  const { restaurant_name, restaurant_city, restaurant_state } = req.body;

  //check if any params were not supplied
  if (!restaurant_name || !restaurant_city || !restaurant_state) {
    return res.send("Missing Restaurant Information!");
  }

  try {
    //find restaurant by name
    const fetchRestaurantQuery =
      "SELECT restaurant_name FROM Restaurants WHERE restaurant_name = $1";
    const restaurant = await db.query(fetchRestaurantQuery, [restaurant_name]);

    //send error response if a restaurant was found
    if (restaurant.rows.length !== 0) {
      return res.status(400).send("Restaurant already exists!");
    }

    const insertRestaurantQuery =
      "INSERT INTO Restaurants (restaurant_name, restaurant_city, restaurant_state) VALUES($1, $2, $3) RETURNING *";
    const newRestaurant = await db.query(insertRestaurantQuery, [
      restaurant_name,
      restaurant_city,
      restaurant_state,
    ]);

    res.status(201).send(newRestaurant.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/all-restaurants", async (req, res) => {
  try {
    const fetchRestaurantsQuery = "SELECT * FROM Restaurants";
    const restaurants = await db.query(fetchRestaurantsQuery);
    res.send(restaurants.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
