import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import { getAllRestaurants, submitReview } from "actions";

class ReviewForm extends Component {
  componentDidMount() {
    if (!sessionStorage.getItem("token")) {
      this.props.history.push("/user/login");
    }

    //call action creator to get all restaurants
    this.props.getAllRestaurants();
  }

  state = {
    rating: 0,
    review: "",
    selectedRestaurant: "",
    restaurantId: null,
  };

  renderMenuItems() {
    return this.props.restaurants.map((restaurant) => {
      return (
        <MenuItem
          key={restaurant.restaurant_id}
          value={restaurant.restaurant_name}
          id={restaurant.restaurant_id}
        >
          {restaurant.restaurant_name}
        </MenuItem>
      );
    });
  }

  handleChange = (evt, child) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSelectChange = (evt, child) => {
    this.setState({
      selectedRestaurant: evt.target.value,
      restaurantId: child.props.id,
    });
  };

  handleRatingChange = (evt) => {
    this.setState({ rating: parseInt(evt.target.value) });
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();

    const formValues = {
      stars: this.state.rating,
      review: this.state.review,
    };

    //call action creator to submit review
    this.props.submitReview(
      formValues,
      this.state.restaurantId,
      this.props.history
    );

    //clear form and go back to dashboard
    this.setState({
      rating: 0,
      review: "",
      selectedRestaurant: "",
      restaurantId: null,
    });
  };

  render() {
    return (
      <section>
        <form onSubmit={this.onFormSubmit}>
          <InputLabel id='select-restaurant-label'>Restaurant</InputLabel>
          <Select
            required
            labelId='select-restaurant-label'
            name='selectedRestaurant'
            id='select-restaurant'
            value={this.state.selectedRestaurant}
            onChange={(evt, child) => this.handleSelectChange(evt, child)}
          >
            {this.renderMenuItems()}
          </Select>
          <Rating
            name='rating'
            value={this.state.rating}
            onChange={this.handleRatingChange}
          />
          <TextareaAutosize
            aria-label='review'
            name='review'
            rowsMin={3}
            placeholder='Enter your review...'
            value={this.state.review}
            onChange={this.handleChange}
          />

          <Button type='submit' color='primary'>
            Submit
          </Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
  };
};

export default connect(mapStateToProps, { getAllRestaurants, submitReview })(
  withRouter(ReviewForm)
);
