const express = require("express");
const router = express.Router();
const { db } = require("../../firebase/firebase");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// Other routes
const subaccounts = require("./subaccount");

// Subaccounts
router.use("/subaccounts", subaccounts);

module.exports = router;
