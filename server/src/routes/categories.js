const express = require("express");
const router = express.Router();

const categoryService = require("../services/category");

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
    const products = await categoryService.getOne(req.params);
    res.send(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
