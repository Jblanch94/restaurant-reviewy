CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    stars INT NOT NULL,
    review TEXT NOT NULL,
    useful BOOLEAN DEFAULT FALSE,
	user_id INT NOT NULL,
	restaurant_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY(restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    CHECK (stars >= 0 AND stars <= 5)
);