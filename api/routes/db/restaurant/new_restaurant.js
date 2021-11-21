const express = require("express");
const router = express.Router();
const { db } = require("../../../firebase/firebase.js");
const httpStatusCodes = require("./../../../../constants/http_status_codes");

router.post("/first", async (req, res) => {
  const userDetails = req.body;

  const hasUserAccount = userDetails.hasUserAccount;

  console.log(userDetails);

  try {
    const dbResponse = await db
      .collection("users")
      .doc(userDetails.uid)
      .set({
        userType: {
          isRestaurant: userDetails.hasUserAccount ? true : false,
          isRegUser: userDetails.isRegUser ? true : false,
        },
        restaurantName: userDetails.restaurantName,
      });

    res.status(200).json({ body: req.body, dbResponse });
    res.end();
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCodes.HTTP_204_NO_CONTENT)
      .json({ error: "An error occurred" });
  }
});

router.get("/user_type", async (req, res) => {
  // Users doc ref
  const usersRef = db.collection("users").doc(req.body.uid);
  const doc = await usersRef.get();

  //

  console.log(doc.data());

  if (!doc.exists) {
    res.status(404).json({ is_restaurant: false });
  } else {
    const docData = doc.data();
    //   if (docData.userType.)
    res.status(404).json({ is_restaurant: false });
  }
});

module.exports = router;
