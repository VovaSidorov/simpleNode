'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    price: DataTypes.FLOAT,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};