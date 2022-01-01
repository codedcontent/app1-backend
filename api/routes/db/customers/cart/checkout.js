const express = require("express");
const router = express.Router();
const { db } = require("../../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// User wants to check out
router.post("/:userUID", (req, res) => {
  console.log("Request");
  const { userUID } = req.params;
  const { checkoutData } = req.body;

  console.log({ checkoutData });
});

module.exports = router;
