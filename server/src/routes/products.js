const express = require("express");
const router = express.Router();

const productService = require("../services/product");

router.get("/", async (req, res, next) => {
  try {
    const allStores= await productService.getAll(req.body);
    res.send(allStores);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dbResponse = await productService.createNew(req.body);
    res.send(dbResponse);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const location = await productService.getOne(req.params);
    res.send(location);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
