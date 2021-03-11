CREATE TABLE Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(255) NOT NULL,
    restaurant_city VARCHAR(255) NOT NULL,
    restaurant_state CHAR(2) NOT NULL,
    average_rating INT DEFAULT 0
);