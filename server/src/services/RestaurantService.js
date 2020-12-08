const db = require('../db/config');

class RestaurantService {
  async createNewRestaurant(restaurant) {
    try {
      //find restaurant by name
      const fetchRestaurantQuery =
        'SELECT restaurant_name FROM Restaurants WHERE restaurant_name = $1';
      const response = await db.query(fetchRestaurantQuery, [
        restaurant.restaurant_name,
      ]);

      //send error response if a restaurant was found
      if (response.rows.length !== 0) {
        throw {
          type: 'error',
          statusCode: 400,
          message: 'Restaurant already exsists!',
        };
      }

      const insertRestaurantQuery =
        'INSERT INTO Restaurants (restaurant_name, restaurant_city, restaurant_state) VALUES($1, $2, $3) RETURNING *';
      const newRestaurant = await db.query(insertRestaurantQuery, [
        restaurant.restaurant_name,
        restaurant.restaurant_city,
        restaurant.restaurant_state,
      ]);
      return newRestaurant;
    } catch (err) {
      return err;
    }
  }

  async fetchAllRestaurantsAndAvgRating() {
    try {
      const query = `SELECT DISTINCT rest.*, p.avg_rating FROM restaurants rest
    JOIN reviews rev ON rev.restaurant_id = rest.restaurant_id
    JOIN (SELECT restaurant_id, AVG(stars)::integer AS avg_rating FROM reviews
    GROUP BY restaurant_id) AS p ON p.restaurant_id = rev.restaurant_id ORDER BY rest.restaurant_id`;
      const restaurants = await db.query(query);
      return restaurants;
    } catch (err) {
      return err;
    }
  }

  async fetchAllRestaurants() {
    try {
      const query = 'SELECT * FROM restaurants';
      const response = await db.query(query);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = RestaurantService;
