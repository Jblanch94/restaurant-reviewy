import React from 'react';

import ReviewCard from 'components/ui/ReviewCard';

const Restaurant = ({ reviews }) => {
  const renderContent = () => {
    return reviews.map((review) => {
      return (
        <ReviewCard
          key={review.review_id}
          review={review.review}
          rating={review.stars}
        />
      );
    });
  };

  return <>{renderContent()}</>;
};

export default Restaurant;
