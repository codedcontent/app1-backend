const express = require("express");
const router = express.Router();
const { db } = require("../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const httpStatusCodes = require("../../../../constants/http_status_codes");
const cart = require("./cart/cart");
const { app } = require("firebase-admin");

// Get the users feed
router.get("/feed/:userUID", async (req, res) => {
  const { userUID } = req.params;

  // Do some AI shit and send some feed data
  res.json({
    feed: [
      {
        mealName: "pounded yam and egusi",
        mealDescription:
          "Meal is very good, yes Meal Yes lorem Introdu Meal Yes lorem Introdu Meal is very good",
        mealPrice: 8000,
        mealPrepTime: 60,
        likes: 999,
        isLIked: false,
        isSaved: true,
        restaurantName: "Amala Connect",
        restaurantAddress: "This place that place",
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      },
      {
        mealName: "Some new meal",
        mealDescription: "Meal is very good",
        mealPrice: 700,
        mealPrepTime: 20,
        likes: 1000,
        isLIked: true,
        isSaved: false,
        restaurantName: "Not Mephy Store",
        restaurantAddress: "This place that place",
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80",
      },
    ],
  });

  // Get the users restaurant feed
  router.get("/restaurant/:userUID", async (req, res) => {
    const { userUID } = req.params;
    const { type } = req.body;
    if (type === "restaurant-near-me") {
      res.json({ type, userUID });
    } else if (type === "top-restaurant") {
      res.json({ type, userUID });
    }
  });
});

// Route to the customers cart
router.use("/cart", cart);

module.exports = router;
