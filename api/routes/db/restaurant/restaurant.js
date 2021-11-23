const express = require("express");
const router = express.Router();
const { db } = require("../../../firebase/firebase.js");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const httpStatusCodes = require("./../../../../constants/http_status_codes");

// Add new items to the restaurants menu
router.post("/menu", async (req, res) => {
  // TODO: FUTURE: Prevent user from adding the same product
  const { mealInfo, uid, fileRef } = req.body;

  const menuRef = db.collection(
    `/users/${uid}/restaurant/restaurantMenu/menu/`
  );

  try {
    const dbRes = await menuRef.add({
      ...mealInfo,
      timestamp: FieldValue.serverTimestamp(),
      fileRef: `${uid}/${fileRef}`,
      merchantId: uid,
    });

    // Return after adding
    res.status(httpStatusCodes.HTTP_201_CREATED).json({
      success: true,
      dbRes,
    });
  } catch (error) {
    res.status(httpStatusCodes.HTTP_503_SERVICE_UNAVAILABLE).json({
      error: error,
    });
  }
});

// Get the restaurants menu
router.get("/menu", async (req, res) => {
  const { restaurantId } = req.body;

  // Get all the menu items for that user's restaurant
  const menuRef = db.collection(
    `/users/${restaurantId}/restaurant/restaurantMenu/menu/`
  );

  const menu = [];

  try {
    const snapshot = await menuRef.get();

    // Get all the documents within the menu collection
    snapshot.forEach((doc) => {
      menu.push({
        docId: doc.id,
        data: doc.data(),
      });
    });

    res.status(httpStatusCodes.HTTP_200_OK).json({
      success: true,
      menu,
    });
  } catch (error) {
    res.status(httpStatusCodes.HTTP_400_BAD_REQUEST).json({
      error: "Invalid Request",
    });
  }
});

// Get the meal details for a particular item
router.get("/menu/:restaurantId/:mealId", async (req, res) => {
  const { restaurantId, mealId } = req.params;

  const menuRef = db.doc(
    `/users/${restaurantId}/restaurant/restaurantMenu/menu/${mealId}`
  );

  try {
    const meal = await menuRef.get();

    if (meal.exists) {
      res.status(httpStatusCodes.HTTP_200_OK).json({
        success: true,
        menu: meal.data(),
      });
    } else {
      res.status(httpStatusCodes.HTTP_404_NOT_FOUND).json({
        error: "Meal does not exist",
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.HTTP_503_SERVICE_UNAVAILABLE).json({
      error: error,
    });
  }
});

// Update a meals data
router.patch("/menu/:restaurantId/:mealId", async (req, res) => {
  const { restaurantId, mealId } = req.params;
  const { propsToUpdate } = req.body;

  console.log(propsToUpdate);

  if (Object.keys(propsToUpdate).length == 0) {
    res.status(httpStatusCodes.HTTP_400_BAD_REQUEST).json({
      error: {
        message: "Empty object provided",
      },
    });
    return;
  }

  const menuRef = db.doc(
    `/users/${restaurantId}/restaurant/restaurantMenu/menu/${mealId}`
  );

  try {
    const resp = menuRef.update({
      ...propsToUpdate,
    });

    res.status(httpStatusCodes.HTTP_200_OK).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatusCodes.HTTP_400_BAD_REQUEST).json({
      error: error,
    });
  }
});

module.exports = router;
