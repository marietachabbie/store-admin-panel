const { Category } = require("../models/category");
const createDatabase = require("../models/db");
const db = createDatabase();

module.exports = {
  getOne: async ({ id }) => {
    const res = await db.query(`SELECT pp.id, pp.name as product, price, pp.image, ss.name as store
    FROM products pp
    JOIN stores ss on ss.id = pp.store_id
    WHERE pp.category_id = ${id}
    UNION SELECT pp.id, pp.name as product, price, pp.image, 'Not Specified' as store
    FROM products pp WHERE pp.store_id ISNULL
    ORDER BY id;`);

    return res?.[0] ?? [];
  },

  createNew: async (categoryData) => {
    const res = await Category.create(categoryData);

    return { id: res.id, message: "Successfully inserted new category!" };
  },
};
