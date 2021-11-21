const express = require("express");
const router = express.Router();
const { db } = require("../../../firebase/firebase.js");

router.post("/", async (req, res) => {
  const userDetails = req.body;

  console.log(userDetails.uid, userDetails.userType);

  try {
    const dbResponse = await db
      .collection("users")
      .doc(userDetails.uid)
      .set({ userType: userDetails.userType });

    res.status(200).json({ body: req.body, dbResponse });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "An error occurred" });
  }
});

module.exports = router;
