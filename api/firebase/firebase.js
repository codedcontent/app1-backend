const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: cert(serviceAccount),
});

// Initializations
const db = getFirestore();

module.exports = { db };
