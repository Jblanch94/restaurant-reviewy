CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    review_count INT DEFAULT 0,
    isAdmin BOOLEAN DEFAULT false
);