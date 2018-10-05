var express = require('express');

var router = express.Router();

var Page = require('../models/page');
/*
* GET/
*/
router.get('/', function (req, res) {
    Page.findOne({ slug:'home' }, function (err, page) {
        if (err) console.log(err)
            res.render('index', {
                Title: page.Title,
                content:page.content
            });
            
    })
});

/*
* GET a page
*/
router.get('/:slug', function (req, res) {
    var slug = req.params.slug;
    Page.findOne({ slug: slug }, function (err, page) {
        if (err) console.log(err)

        if(!page){
            res.redirect('/')
        }else{
            res.render('index', {
                Title: page.Title,
                content:page.content
            });

        }
            
    })
    
});

// router.get('/test',function(req,res){
//     res.send('pages test');
// });


//Export
module.exports = router; 