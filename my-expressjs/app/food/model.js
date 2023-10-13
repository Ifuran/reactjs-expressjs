const sequelize = require("../../config/sequelize");
const { Sequelize, DataTypes } = require("sequelize");

//Membuat tabel database

const food = sequelize.define("food", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = food;
