import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { Link } from 'react-router-dom';

import useStyles from '../../assets/styles/RestaurantCard';

const RestaurantCard = ({ id, name, city, state, avg_rating, user }) => {
  const classes = useStyles();

  function renderUserLink() {
    if (!user.user.isadmin) {
      return (
        <Container>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/user/dashboard/restaurant/${id}`}
          >
            <Button color="primary" size="small">
              View More Info
            </Button>
          </Link>
        </Container>
      );
    } else return null;
  }

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        <Container className={classes.cardContentContainer}>
          <div>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>
            <Typography component="p" variant="body2" color="textSecondary">
              {city}, {state}
            </Typography>
          </div>
          <div className={classes.ratingContainer}>
            <Rating name="average rating" value={parseInt(avg_rating)} />
          </div>
        </Container>
      </CardContent>
      <CardActions>{renderUserLink()}</CardActions>
    </Card>
  );
};

export default RestaurantCard;
