CREATE TABLE Category_Restaurant (
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY(restaurant_id) REFERENCES Restaurants(restaurant_id),
    FOREIGN KEY(category_id) REFERENCES Category(category_id)
);