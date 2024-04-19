const { Store } = require("../models/store");

module.exports = {
  getAll: async ({ page = 1, pageSize = 20 }) => {
    const offset = page === 1 ? 0 : page * pageSize;
    const limit = pageSize;

    return await Store.findAll({ offset, limit });
  },

  getOne: async ({ id }) => {
    return await Store.findAll({ where: { id } });
  },

  createNew: async (storeData) => {
    const res = await Store.create(storeData);

    return { id: res.id, message: "Successfully inserted new store!" };
  },
};
