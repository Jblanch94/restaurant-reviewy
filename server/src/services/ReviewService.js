const db = require('../db/config');

class ReviewService {
  async createNewReview(review) {
    try {
      //find restaurant by id
      const fetchRestaurantQuery =
        'SELECT * FROM Restaurants WHERE restaurant_id = $1';
      const restaurant = await db.query(fetchRestaurantQuery, [
        review.restaurantId,
      ]);
      //send back error if restaurant does not exist
      if (restaurant.rows.length === 0) {
        throw {
          type: 'error',
          statusCode: 404,
          message: 'Restaurant does not exist!',
        };
      }

      //insert review into db with correct user id and restaurant id
      const insertReviewQuery =
        'INSERT INTO Reviews (stars, review, user_id, restaurant_id) VALUES($1, $2, $3, $4) RETURNING *';
      const newReview = await db.query(insertReviewQuery, [
        review.stars,
        review.review,
        review.userId,
        review.restaurantId,
      ]);

      //find user by id and increment the review count
      const fetchUserQuery =
        'SELECT review_count FROM Users WHERE user_id = $1';
      const updateReviewCountQuery =
        'UPDATE Users SET review_count = $1 + 1 WHERE user_id = $2';
      const currentUser = await db.query(fetchUserQuery, [review.userId]);
      await db.query(updateReviewCountQuery, [
        currentUser.rows[0].review_count,
        review.userId,
      ]);
      return newReview;
    } catch (err) {
      return err;
    }
  }

  async fetchReviews() {
    try {
      //query to get review, average rating and restaurant details
      const query = `SELECT rest.*, rev.*, r.avg_rating
    FROM restaurants rest
    JOIN reviews rev ON rev.restaurant_id = rest.restaurant_id
    JOIN (
      SELECT restaurant_id, AVG(stars)::INTEGER AS avg_rating
      FROM reviews
      GROUP BY restaurant_id
    ) AS r ON r.restaurant_id = rev.restaurant_id`;
      const response = await db.query(query);
      return response;
    } catch (err) {
      return err;
    }
  }

  async fetchReviewById(review) {
    try {
      const fetchRestaurantReviewsQuery = `SELECT rest.*, rev.* FROM Restaurants rest
         JOIN Reviews rev ON rev.restaurant_id = rest.restaurant_id
         WHERE rest.restaurant_id = $1`;
      const response = await db.query(fetchRestaurantReviewsQuery, [
        review.restaurantId,
      ]);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = ReviewService;
