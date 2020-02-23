'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  }, {});
  CartItem.associate = function(models) {
    CartItem.belongsTo(models.User);
    CartItem.belongsTo(models.Product);
  };
  return CartItem;
};