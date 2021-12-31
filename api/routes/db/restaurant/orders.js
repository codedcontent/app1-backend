const express = require("express");
const router = express.Router();
const { db } = require("../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const httpStatusCodes = require("../../../../constants/http_status_codes");

// Accept new orders
router.post("/accept/:restaurantID", async (req, res) => {
  const { restaurantID } = req.params;
  const { orderDetails } = req.body;

  console.log(req.body);

  // Add accepted orders to db
  const acceptedOrdersRef = db.collection(
    `users/${restaurantID}/restaurant/orders/acceptedOrders/`
  );

  try {
    const dbResp1 = await acceptedOrdersRef.add({
      orderDetails,
    });

    // Send a reference to the accepted order
    res.json({ orderRef: dbResp1.id });
  } catch (error) {
    res.json({
      error,
    });
  }

  // Update user on order being fulfilled
  const userOrdersRef = db.collection(
    `/users/${restaurantID}/user/userData/orders`
  );

  // userOrdersRef.res.json({
  //   success: true,
  //   msg: "order added successfully",
  // });
});

// Complete an order
router.post("/complete/:uid", async (req, res) => {
  const { uid } = req.params;
  const { orderRef, orderDetails } = req.body;

  // Complete the order

  // old orders ref
  const oldOrdersRef = db.collection(
    `users/${uid}/restaurant/orders/oldOrders`
  );

  // accepted order ref
  const acceptedOrderRef = db.doc(orderRef);

  try {
    // Add the order to the oldOrders collection
    await oldOrdersRef.add(orderDetails);

    // Remove the order from the accepted orders collection
    await acceptedOrderRef.delete();

    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
