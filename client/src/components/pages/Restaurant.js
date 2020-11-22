import React from 'react';

import ReviewCard from '../ui/ReviewCard';

const Restaurant = ({ reviews, dispatch, fetchUserById }) => {
  const renderContent = () => {
    return reviews.map((review) => {
      return (
        <ReviewCard
          key={review.review_id}
          review={review.review}
          rating={review.stars}
          user_id={review.user_id}
        />
      );
    });
  };

  return <>{renderContent()}</>;
};

export default Restaurant;
