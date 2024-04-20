const express = require("express");
const router = express.Router();

const storeService = require("../services/store");

router.get("/", async (req, res, next) => {
  try {
    const allStores= await storeService.getAll(req.body);
    res.send(allStores);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dbResponse = await storeService.createNew(req.body);
    res.send(dbResponse);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const store = await storeService.getOne(req.params);
    res.send(store);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
