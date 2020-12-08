class Review {
  constructor(review) {
    this.stars = review.stars;
    this.review = review.review;
    this.restaurantId = review.restaurantId;
    this.userId = review.userId;
  }
}

module.exports = Review;
