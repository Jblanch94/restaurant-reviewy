import React, { useEffect } from 'react';
import { Card, Typography, CardContent, Container } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserById } from '../../actions/userActions';
import useStyles from '../../assets/styles/ReviewCard';

const ReviewCard = ({ review, rating, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  const reviewOwner = users.users.find((el) => {
    return el.user_id === userId;
  });

  return (
    <>
      <Card className={classes.cardContainer}>
        <CardContent>
          <Container className={classes.cardContentContainer}>
            <Typography component="h5" variant="h5">
              {reviewOwner !== undefined ? reviewOwner.username : ''}
            </Typography>
            <Rating name="review-rating" readOnly value={rating} />
          </Container>

          <Container>
            <Typography component="p" variant="body2" color="textSecondary">
              {review}
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard;
