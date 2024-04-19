const { Sequelize, DataTypes } = require("sequelize");
const createDatabase = require("./db");

const db = createDatabase();

const Category = db.define("category", {
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
  created_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  },
}, {
  timestamps: false,
});

module.exports = { Category };
