const CartItem = require('../models').CartItem;
const Product = require('../models').Product;

exports.cart_list = (req, res) => {

    const {params: {userId}} = req;

    CartItem.findAll({
        where:{userId},
        include:[{model: Product}]
    })
        .then(data => {
            res.json({
                status: "ok",
                data:{
                    cartItems: data,
                }
            });
        });
};