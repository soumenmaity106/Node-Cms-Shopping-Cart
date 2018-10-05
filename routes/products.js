var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var auth = require('../config/auth');
var isUser = auth.isUser;
//get product model
var Product = require('../models/product');

//get category model
var Category = require('../models/category');
/*
* GET all product
*/
router.get('/',  function (req, res) {
    //router.get('/', isUser, function (req, res)
    Product.find(function (err, products) {
        if (err) console.log(err)
        res.render('all_products', {
            Title: 'All Product',
            products: products
        });

    })
});

/*
* GET  product by category
*/
router.get('/:category', function (req, res) {

    var categorySlug = req.params.category;

    Category.findOne({slug: categorySlug}, function (err, c) {
        Product.find({category: categorySlug}, function (err, products) {
            if (err)
                console.log(err);

            res.render('cat_products', {
                Title: c.Title,
                products: products
            });
        });
    });

});

/**
 * Get Product Details
 */
router.get('/:category/:product',function(req,res){
    var galleryImages = null;

    var loggedin = (req.isAuthenticated()) ? true : false;
    
    Product.findOne({slug: req.params.product},function(err,product){
        if(err){
            console.log(err)
        }else{
            var galleryDir = 'public/product_images/' + product._id + '/gallery';
            fs.readdir(galleryDir,function(err,files){
                if(err){
                    console.log(err)
                }else{
                    galleryImages = files;

                    res.render('product',{
                        Title:product.Title,
                        p:product,
                        galleryImages:galleryImages,
                        loggedin:loggedin
                    })
                }
            })

        }
    })
})


//Export
module.exports = router; 