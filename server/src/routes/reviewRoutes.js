const express = require("express");

const db = require("../db/config");
const authorization = require("../middlewares/authorization");

const router = express.Router();

router.post("/restaurant/:id", authorization, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { stars, review } = req.body;

  try {
    //find restaurant by id
    const fetchRestaurantQuery =
      "SELECT * FROM Restaurant WHERE restaurant_id = $1";
    const restaurant = await db.query(fetchRestaurantQuery, [id]);
    //send back error if restaurant does not exist
    if (restaurant.rows.length === 0) {
      return res.status(404).send("Restaurant does not exist!");
    }
    //insert review into db with correct user id and restaurant id
    const insertReviewQuery =
      "INSERT INTO Reviews (stars, review, user_id, restaurant_id) VALUES($1, $2, $3, $4) RETURNING *";
    const newReview = await db.query(insertReviewQuery, [
      stars,
      review,
      userId,
      id,
    ]);

    //find user by id and increment the review count
    const fetchUserQuery = "SELECT review_count FROM Users WHERE user_id = $1";
    const updateReviewCountQuery = "UPDATE Users SET review_count = $1 ";
    const currentUser = await db.query(fetchUserQuery, [userId]);
    await db.query(updateReviewCountQuery, [
      currentUser.rows[0].review_count++,
    ]);

    res.status(201).json(newReview.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/restaurant/all-reviews", async (req, res) => {
  try {
    const getReviewsQuery =
      "SELECT rest.*, rev.* FROM Restaurant rest JOIN Reviews rev ON rev.review_id = rest.restaurant_id";
    const response = await db.query(getReviewsQuery);
    res.json(response.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:reviewId/restaurant/:restaurantId", async (req, res) => {
  const { reviewId, restaurantId } = req.params;

  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/:reviewId/restaurant/:restaurantId", async (req, res) => {
  const { reviewId, restaurantId } = req.params;
});

module.exports = router;
