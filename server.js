const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const auth = require("./api/routes/auth/auth.js");
const new_user = require("./api/routes/db/user/new_user.js");
const new_restaurant = require("./api/routes/db/restaurant/new_restaurant.js");
const restaurant = require("./api/routes/db/restaurant/restaurant.js");

// Initializations
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MY_PORT = process.env.PORT;

// Server routes
app.use("/auth", auth);

app.use("/new_user", new_user);

// Route to doing anything new_restaurant
app.use("/new_restaurant", new_restaurant);

// Route to CRUD operations on the restaurants db profile
app.use("/restaurant", restaurant);

app.post("/test", async (req, res) => {
  res.json({
    req: req.headers,
    res: "Data",
  });
});

app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));
