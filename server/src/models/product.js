const { Sequelize, DataTypes } = require("sequelize");
const createDatabase = require("./db");

const db = createDatabase();

const Product = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // image: {
  // type: DataTypes.STRING,
  // allowNull: true,
  // },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  },
}, {
  timestamps: false,
});

module.exports = { Product };
