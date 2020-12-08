const Review = require('../models/Review');
const ReviewService = require('../services/ReviewService');

const createNewReview = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  console.log('user', req.user);

  try {
    const review = new Review({ ...req.body, userId, restaurantId: id });
    const reviewService = new ReviewService();
    const newReview = await reviewService.createNewReview(review);
    if (newReview.type === 'error') {
      throw newReview;
    }
    console.log(newReview);
    res.status(201).json(newReview.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
  }
};

const fetchReviews = async (req, res) => {
  try {
    const reviewService = new ReviewService();
    const response = await reviewService.fetchReviews();
    const data = response.rows;

    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const fetchReviewById = async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reviewObject = { restaurantId };
    const review = new Review(reviewObject);
    const reviewService = new ReviewService();
    const response = await reviewService.fetchReviewById(review);
    res.send(response.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createNewReview,
  fetchReviews,
  fetchReviewById,
};
