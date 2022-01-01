const express = require("express");
const router = express.Router();
const { db } = require("../../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// Working with cart
// The cart stores things that can be from various restaurants
// When customer is checking out, server has to sort the cart items to their various restaurants and let them know of a new order

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
  /* That is every single item added to the cart even if the same items appears twice */
  const singleItemCount = itemsToAddToCart
    .map((item) => item.amount)
    .reduce((acc, item) => acc + item);

  // Cart Reference
  const cartRef = db.doc(`users/${userUID}/user/userData/cart/cartItems`);
  // User data ref
  const userDataRef = db.doc(`users/${userUID}/user/userData`);

  try {
    // Add items to users cart
    // const resp = await cartRef.add({ cartItems: itemsToAddToCart });
    const resp = await cartRef.set({ cartItems: itemsToAddToCart });

    // Increment or decrement items in cart
    await userDataRef.update({ itemsInCart: singleItemCount });

    res.json({ writeTime: resp.writeTime });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
