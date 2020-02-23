const CartItem = require('../models').CartItem;
const Product = require('../models').Product;

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

exports.add_to_cart = (req, res) => {

    const {params: {userId,productId}} = req;

    console.log(userId,productId);

    CartItem.findOne({ where: {userId,productId} })
        .then(function(obj) {
            if(obj) { // update
                console.log("update",JSON.stringify(obj));
                obj.increment('amount');
                return res.json({
                    status: "ok",
                    data:{
                        cartItems: obj,
                    }
                });
            }
            else { // insert
                console.log("insert",JSON.stringify(obj));
                const newItem = CartItem.create({userId,productId,amount:1});
                return res.json({
                    status: "ok",
                    data:{
                        cartItems: newItem,
                    }
                });
            }
        });

};