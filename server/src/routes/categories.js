const express = require("express");
const router = express.Router();

const categoryService = require("../services/category");

router.get("/", async (req, res, next) => {
  try {
    const allStores= await categoryService.getAll(req.body);
    res.send(allStores);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dbResponse = await categoryService.createNew(req.body);
    res.send(dbResponse);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const location = await categoryService.getOne(req.params);
    res.send(location);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
