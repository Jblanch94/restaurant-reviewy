import React from 'react';

import ReviewCard from '../ui/ReviewCard';

type RestaurantProps = {
  reviews: {
    map: any;
  };
};

const Restaurant: React.FC<RestaurantProps> = ({ reviews }) => {
  const renderContent = () => {
    return reviews.map((review: any) => {
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
