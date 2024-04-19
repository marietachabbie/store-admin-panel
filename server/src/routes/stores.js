const express = require("express");
const router = express.Router();

// const storeService = require("../services/store");

router.get("/", (req, res) => {
  res.send("Stores homepage!");
});

module.exports = router;
