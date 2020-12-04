import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import useStyles from '../../assets/styles/RestaurantCard';
import { User } from '../../assets/types';

type RestaurantCardProps = {
  id: number;
  name: string;
  city: string;
  state: string;
  rating: string;
  user: User;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  city,
  state,
  rating,
  user,
}) => {
  const classes = useStyles();

  function renderUserLink(): React.ReactNode {
    if (!user.isadmin) {
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
            <Typography component="p" variant="body2" color="textSecondary">
              Average Rating: {rating}
            </Typography>
          </div>
        </Container>
      </CardContent>
      <CardActions>{renderUserLink()}</CardActions>
    </Card>
  );
};

export default RestaurantCard;
