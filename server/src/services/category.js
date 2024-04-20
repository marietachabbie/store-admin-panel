const { Category } = require("../models/category");
const { Product } = require("../models/product");

module.exports = {
  getOne: async ({ id }) => {
    return await Product.findAll({ where: { category_id: id } });
  },

  createNew: async (categoryData) => {
    const res = await Category.create(categoryData);

    return { id: res.id, message: "Successfully inserted new category!" };
  },
};
