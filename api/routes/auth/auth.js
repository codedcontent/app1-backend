const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  console.info(`Request to the ${req.baseUrl}`);
});

module.exports = router;
