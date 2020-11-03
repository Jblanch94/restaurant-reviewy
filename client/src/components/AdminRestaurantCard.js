import React from 'react';
import { Card, CardContent, Typography, Container } from '@material-ui/core';

const AdminRestaurantCard = ({ name, city, state, rating }) => {
  return (
    <Card
      style={{
        margin: '5rem',
        maxWidth: 500,
        minWidth: 500,
      }}
    >
      <CardContent>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <div>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>
            <Typography component="p" variant="body2" color="textSecondary">
              {city}, {state}
            </Typography>
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <Typography component="p" variant="body2" color="textSecondary">
              Average Rating: {rating}
            </Typography>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
};

export default AdminRestaurantCard;
