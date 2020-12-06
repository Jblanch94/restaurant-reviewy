const db = require('../db/config');

const createNewReview = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { stars, review } = req.body;

  try {
    //find restaurant by id
    const fetchRestaurantQuery =
      'SELECT * FROM Restaurants WHERE restaurant_id = $1';
    const restaurant = await db.query(fetchRestaurantQuery, [id]);
    //send back error if restaurant does not exist
    if (restaurant.rows.length === 0) {
      return res.status(404).send('Restaurant does not exist!');
    }
    //insert review into db with correct user id and restaurant id
    const insertReviewQuery =
      'INSERT INTO Reviews (stars, review, user_id, restaurant_id) VALUES($1, $2, $3, $4) RETURNING *';
    const newReview = await db.query(insertReviewQuery, [
      stars,
      review,
      userId,
      id,
    ]);

    //find user by id and increment the review count
    const fetchUserQuery = 'SELECT review_count FROM Users WHERE user_id = $1';
    const updateReviewCountQuery =
      'UPDATE Users SET review_count = $1 + 1 WHERE user_id = $2';
    const currentUser = await db.query(fetchUserQuery, [userId]);
    await db.query(updateReviewCountQuery, [
      currentUser.rows[0].review_count,
      userId,
    ]);

    res.status(201).json(newReview.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchReviews = async (req, res) => {
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
    const data = response.rows;

    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchReviewById = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const fetchRestaurantReviewsQuery =
      'SELECT rest.*, rev.* FROM Restaurants rest JOIN Reviews rev ON rev.restaurant_id = rest.restaurant_id WHERE rest.restaurant_id = $1';
    const response = await db.query(fetchRestaurantReviewsQuery, [
      restaurantId,
    ]);
    res.send(response.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateUsefulCount = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const fetchReviewQuery = 'SELECT useful FROM Reviews WHERE review_id = $1';
    const updateUsefulQuery =
      'UPDATE Reviews SET useful = $1 + 1 WHERE review_id = $2 RETURNING * ';
    const review = await db.query(fetchReviewQuery, [reviewId]);
    const { useful } = review.rows[0];
    const updatedUseful = await db.query(updateUsefulQuery, [useful, reviewId]);
    res.json(updatedUseful.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createNewReview,
  fetchReviews,
  fetchReviewById,
  updateUsefulCount,
};
