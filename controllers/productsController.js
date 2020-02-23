const Product = require('../models').Product;
//console.log('\x1b[31m', err.message);
exports.products_list = (req, res) => {
    Product.findAll()
        .then(data => {
            res.json({
                status: "ok",
                data:{
                    products: data,
                }
            });
        })
};

exports.products_show = (req, res) => {
    const {params: {productId}} = req;

    Product.findById(productId)
        .then(data => {
            console.log(JSON.stringify(data));
            res.json({
                status: "ok",
                data:{
                    products: data,
                }
            });
        })
};

exports.products_new = (req, res) => {

    Product.create(req.body)
        .then(data => {
            console.log(JSON.stringify(data));
            res.json({
                status: "ok",
                data:{
                    products: data,
                }
            });
        })
};

exports.products_update = (req, res) => {
    const {params: {productId}} = req;
    Product.findOne({where:{id: productId}})
        .then(product => {

            product.update({...req.body})
                .then(data => {
                    console.log(JSON.stringify(data));
                    res.json({
                        status: "ok",
                        data:{
                            products: data,
                        }
                    });
                })
        })
};

exports.products_delete = (req, res) => {
    const {params: {productId}} = req;

    Product.destroy({where:{id: productId}})
        .then(data => {
            console.log(JSON.stringify(data));
            res.json({
                status: "ok",
                data:{
                    products: data,
                }
            });
        })
};