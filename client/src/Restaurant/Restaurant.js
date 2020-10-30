import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchRestaurantReviews } from "actions";
import ReviewCard from "components/ReviewCard";

class Restaurant extends Component {
  //TODO: CREATE ACTION CREATOR AND REDUCER TO GET THE USER AND REVIEWS FOR RESTAURANT

  componentDidMount() {
    const id = this.props.match.params.id;

    //call action creator to get all reviews for restaurant
    this.props.fetchRestaurantReviews(id);
  }

  renderContent = () => {
    const { reviews } = this.props;
    return reviews.map((review) => {
      return (
        <ReviewCard
          key={review.review_id}
          review={review.review}
          user={review.user_id}
          rating={review.stars}
        />
      );
    });
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
  };
};

export default connect(mapStateToProps, { fetchRestaurantReviews })(Restaurant);
