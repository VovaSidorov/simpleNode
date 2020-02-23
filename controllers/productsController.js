const Product = require('../models').Product;
//console.log('\x1b[31m', err.message);
exports.products_list = (req, res) => {
    Product.all()
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

    req.checkBody('price', "Price is required").notEmpty().trim();
    req.checkBody('title', "Title is required").notEmpty().trim().isLength({ min: 5 }).withMessage('must be at least 5 chars long');
    req.checkBody('description', "Description is required").notEmpty().trim();
    req.checkBody('image', "Image is required").notEmpty().trim();
    req.checkBody('amount', "Amount is required").notEmpty().trim();

    const errors = req.validationErrors();

    if(errors){
        return res.json({
            error: errors
        })
    }
    Product.create(req.body)
        .then(data => {
            console.log(JSON.stringify(data));
            res.json({
                status: "ok",
                data:{
                    products: data,
                }
            });
        });
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