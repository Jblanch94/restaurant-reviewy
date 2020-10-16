const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 5000;
const baseUrl = "/api/restaurant-reviewy";

app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(cors());

//routes
app.use(`${baseUrl}/auth`, authRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
