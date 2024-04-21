const { Store } = require("../models/store");
const createDatabase = require("../models/db");
const db = createDatabase();

module.exports = {
  getAll: async ({ page = 1, pageSize = 20 }) => {
    const res = await db.query(`SELECT ss.id, ss.name, category_id,
    categories.name as category
    FROM stores ss
    JOIN categories on ss.category_id = categories.id
    UNION SELECT id, name, category_id, 'Not specified' as category
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
