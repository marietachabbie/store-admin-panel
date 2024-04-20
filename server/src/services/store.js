const { Store } = require("../models/store");
const createDatabase = require("../models/db");
const db = createDatabase();

module.exports = {
  getAll: async ({ page = 1, pageSize = 20 }) => {
    const offset = page === 1 ? 0 : page * pageSize;
    const limit = pageSize;

    const res = await db.query(`SELECT stores.id, stores.name, categories.name as category
    FROM stores
    JOIN categories on stores.category_id = categories.id
    UNION SELECT id, name, 'Not specified' as category
    FROM stores WHERE stores.category_id ISNULL
    ORDER BY id`);
    return res?.[0] ?? [];
  },

  getOne: async ({ id }) => {
    return await Store.findAll({ where: { id } });
  },

  createNew: async (storeData) => {
    const res = await Store.create(storeData);

    return { id: res.id, message: "Successfully inserted new store!" };
  },
};
