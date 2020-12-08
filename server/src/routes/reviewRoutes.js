const express = require('express');

const authorization = require('../middlewares/authorization');
const {
  createNewReview,
  fetchReviews,
  fetchReviewById,
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/restaurant/:id', authorization, createNewReview);

router.get('/restaurant/all-reviews', fetchReviews);

router.get('/restaurant/:restaurantId', fetchReviewById);

module.exports = router;
