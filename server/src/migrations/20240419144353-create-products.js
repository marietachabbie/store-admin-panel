"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable("products");

    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      // image: {
      // type: Sequelize.STRING,
      // allowNull: true,
      // },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });

    await queryInterface.addConstraint("products", {
      type: "FOREIGN KEY",
      name: "FK_product_category_id",
      fields: [ "category_id" ],
      references: {
        table: "categories",
        field: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("products", {
      type: "FOREIGN KEY",
      name: "FK_product_store_id",
      fields: [ "store_id" ],
      references: {
        table: "stores",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
