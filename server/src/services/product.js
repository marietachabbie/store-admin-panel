const { Product } = require("../models/product");

module.exports = {
  getAll: async ({ page = 1, pageSize = 20 }) => {
    const offset = page === 1 ? 0 : page * pageSize;
    const limit = pageSize;

    return await Product.findAll({ offset, limit });
  },

  getOne: async ({ id }) => {
    return await Product.findAll({ where: { id } });
  },

  createNew: async (productData) => {
    const res = await Product.create(productData);

    return { id: res.id, message: "Successfully inserted new product!" };
  },
};
