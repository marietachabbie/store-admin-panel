const { Category } = require("../models/category");

module.exports = {
  getAll: async ({ page = 1, pageSize = 20 }) => {
    const offset = page === 1 ? 0 : page * pageSize;
    const limit = pageSize;

    return await Category.findAll({ offset, limit });
  },

  getOne: async ({ id }) => {
    return await Category.findAll({ where: { id } });
  },

  createNew: async (categoryData) => {
    const res = await Category.create(categoryData);

    return { id: res.id, message: "Successfully inserted new category!" };
  },
};
