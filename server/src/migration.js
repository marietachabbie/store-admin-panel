const { Sequelize } = require("sequelize");

const { Store } = require("./models/store");
const { Category } = require("./models/category");
const { Product } = require("./models/product");
const createDatabase = require("./models/db");
const initialCategories = require("./data/initial-categories.json");
const initialStores = require("./data/initial-stores.json");
const initialProducts = require("./data/initial-products.json");

const db = createDatabase();

const findOrCreateStore = async (storeData) => {
  await Store.findOrCreate(
    {
      where: {
        name: storeData.name,
      },
      defaults: {
        category_id: storeData.category_id,
        created_at: storeData.created_at,
      },
    }
  );
};

const findOrCreateCategory = async (categoryData) => {
  await Category.findOrCreate(
    {
      where: {
        name: categoryData.name,
      },
      defaults: {
        name: categoryData.name,
        created_at: categoryData.created_at,
      },
    }
  );
};

const findOrCreateProduct = async (productData) => {
  await Product.findOrCreate(
    {
      where: {
        name: productData.name,
      },
      defaults: {
        name: productData.name,
        price: productData.price,
        category_id: productData.category_id,
        store_id: productData.store_id,
        created_at: productData.created_at,
      },
    }
  );
};

const runMigrations = async () => {
  try {
    const fileNames = [
      "20240419144343-create-categories.js",
      "20240419144323-create-stores.js",
      "20240419144353-create-products.js",
    ];

    // create tales
    for (const fileName of fileNames) {
      const migration = require(__dirname + "/migrations/" + fileName);
      await migration.up(db.getQueryInterface(), Sequelize);
    }

    // insert initial categories
    for (const categoryData of initialCategories) {
      await findOrCreateCategory(categoryData);
    }

    // insert initial stores
    for (const storeData of initialStores) {
      await findOrCreateStore(storeData);
    }

    // insert initial products
    for (const productData of initialProducts) {
      await findOrCreateProduct(productData);
    }

    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Error executing migrations:", error);
  } finally {
    await db.close();
  }
};

module.exports = { runMigrations };
