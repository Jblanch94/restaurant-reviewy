CREATE TABLE Restaurant (
    restaurant_id SERIAL PRIMARY KEY,
    restaurtant_name VARCHAR(255) NOT NULL,
    restaurant_city VARCHAR(255) NOT NULL,
    restaurant_state CHAR(2) NOT NULL,
    average_rating INT DEFAULT 0
);