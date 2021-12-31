const express = require("express");
const router = express.Router();
const { db } = require("../../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// Get the users cart
router.get("/:userUID", async (req, res) => {
  const { userUID } = req.params;

  const cartRef = db.collection(`users/${userUID}/user/userData/cart`);

  try {
    const cartSnapshot = await cartRef.get();

    if (cartSnapshot.empty) {
      res.json([]);
      return;
    }

    const cart = [];
    cartSnapshot.forEach((doc) => cart.push(doc.data()));

    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

// Add to a users cart
router.post("/:userUID", async (req, res) => {
  const { userUID } = req.params;
  const { itemsToAddToCart } = req.body;

  // Get the number of items in cart
  const itemCount = itemsToAddToCart
    .map((item) => item.amount)
    .reduce((acc, item) => acc + item);

  // Cart Reference
  const cartRef = db.collection(`users/${userUID}/user/userData/cart`);
  // User data ref
  const userDataRef = db.doc(`users/${userUID}/user/userData`);

  try {
    // Add items to users cart
    const resp = await cartRef.add({ cartItems: itemsToAddToCart });
    // Increment cart count
    await userDataRef.update({ itemsInCart: FieldValue.increment(itemCount) });

    res.json({ path: resp.id });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
