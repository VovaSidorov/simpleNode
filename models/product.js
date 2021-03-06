'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    price: DataTypes.FLOAT,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    orders: DataTypes.INTEGER,
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.CartItem);
  };
  return Product;
};