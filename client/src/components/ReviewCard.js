import React from "react";
import { Card, Typography, CardContent, Container } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ user, review, rating }) => {
  return (
    <>
      <Card style={{ minWidth: 500, maxWidth: 500, margin: "5rem" }}>
        <CardContent>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography component='h5' variant='h5'>
              {user}
            </Typography>
            <Rating name='review-rating' readOnly value={rating} />
          </Container>

          <Container>
            <Typography component='p' variant='body2' color='textSecondary'>
              {review}
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard;
