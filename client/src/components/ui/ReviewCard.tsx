import React from 'react';
import { Card, Typography, CardContent, Container } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import useStyles from '../../assets/styles/ReviewCard';

type ReviewCardProps = {
  review: string;
  rating: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, rating }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.cardContainer}>
        <CardContent>
          <Container className={classes.cardContentContainer}>
            <Typography component="h5" variant="h5">
              user
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
