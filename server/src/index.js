const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const ErrorHandler = require("./middlewares/ErrorHandler");
const { runMigrations } = require("./migration");
const storeRoute = require("./routes/stores");
const productRoute = require("./routes/products");
const categorieRoute = require("./routes/categories");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use("/api/stores", storeRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categorieRoute);

app.use(ErrorHandler);

runMigrations()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error starting the app:", error);
  });

module.exports = app;
