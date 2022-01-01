const express = require("express");
const router = express.Router();
const { db } = require("../../firebase/firebase");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const https = require("https");

// Create a subaccount
router.post("/", (req, res) => {
  const { business_name, settlement_bank, account_number, percentage_charge } =
    req.body;

  // details of the business
  const params = JSON.stringify({
    business_name,
    settlement_bank,
    account_number,
    percentage_charge,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/subaccount",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const httpRequest = https
    .request(options, (httpRes) => {
      let data = "";

      httpRes.on("data", (chunk) => {
        data += chunk;
      });

      httpRes.on("end", () => {
        res.json(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
      res.json({ error });
    });

  httpRequest.write(params);
  httpRequest.end();
});

module.exports = router;
