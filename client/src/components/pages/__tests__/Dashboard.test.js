import React from 'react';
import Dashboard from '../Dashboard';
import Root from '../../../test-utils/Root';
import RouterWrapper from '../../../test-utils/RouterWrapper';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

test('Dashboard component renders with no error', () => {
  const restaurants = [
    {
      restaurant_id: 1,
      restaurant_name: 'McDonalds',
      restaurant_city: 'Norwich',
      restaurant_state: 'Connecticut',
      avg_rating: 4,
    },
  ];

  const user = {
    users: [],
    user: {
      user_id: 1,
      first_name: 'Johnny',
      last_name: 'Blanchard',
      username: 'jblanchard',
      isadmin: false,
    },
  };
  const { getByTestId } = render(
    <Root>
      <RouterWrapper
        ui={<Dashboard restaurants={restaurants} user={user} />}
        initialRoute="/"
      />
    </Root>
  );

  // check that the test id from the component rendered exists
  expect(getByTestId('Dashboard')).not.toBeNull();
});

// Test with given props that proper number of restaurant cards are rendered
test('Renders proper number of restaurant cards with the given props', () => {
  const restaurants = [
    {
      restaurant_id: 1,
      restaurant_name: 'McDonalds',
      restaurant_city: 'Norwich',
      restaurant_state: 'Connecticut',
      avg_rating: 4,
    },
    {
      restaurant_id: 2,
      restaurant_name: 'Popeyes',
      restaurant_city: 'Norwich',
      restaurant_state: 'Connecticut',
      avg_rating: 2,
    },
  ];

  const user = {
    users: [],
    user: {
      user_id: 1,
      first_name: 'Johnny',
      last_name: 'Blanchard',
      username: 'jblanchard',
      isadmin: false,
    },
  };
  const { getAllByTestId } = render(
    <Root>
      <RouterWrapper
        ui={<Dashboard restaurants={restaurants} user={user} />}
        initialRoute="/"
      />
    </Root>
  );

  // assert that there are 2 restaurant cards
  expect(getAllByTestId('restaurant-card').length).toBe(2);
});

describe('FAB is rendered accordingly', () => {
  let restaurants;
  let user;
  beforeEach(() => {
    restaurants = [];
  });

  test('Floating Action Button is rendered if the user is an admin', () => {
    user = {
      users: [],
      user: {
        user_id: 1,
        first_name: 'Johnny',
        last_name: 'Blanchard',
        username: 'jblanchard',
        isadmin: true,
      },
    };

    const { getByTestId } = render(
      <Root>
        <RouterWrapper
          ui={<Dashboard restaurants={restaurants} user={user} />}
          initialRoute="/"
        />
      </Root>
    );
    expect(getByTestId('fab')).not.toBeNull();
  });
});
