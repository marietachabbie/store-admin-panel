const express = require("express");
const multer = require("multer");
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

const appDir = process.cwd();
const imageUploadPath = appDir.replace("/server", "/") + "client/public/product_images";
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`);
  },
});
const imageUpload = multer({ storage: storage });

router.post("/upload-image", imageUpload.array("product-image"), async (req, res, next) => {
  try {
    res.send({ path: req.files[0].path });
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
    const product = await productService.getOne(req.params);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
