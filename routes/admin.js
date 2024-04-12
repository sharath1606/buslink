var express = require('express');
var router = express.Router();
const Product = require('../helpers/product-helpers');
var collection=require('../config/schema');

/* GET users listing. */
router.get('/view-products', async function(req, res, next) {
  try {
    // Retrieve all products from the database
    const products = await Product.find();
    console.log(products)

    // Render the view-products template with the retrieved products
    res.render('admin/view-products', { admin: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/add-products',function(req,res){
  res.render('admin/add-products',{admin:true});
});

router.post('/add-products', async (req, res) => {
  try {
    // Create a new product instance
    const newProduct = new Product({
      name:req.body.name,
      category:req.body.category,
      price:req.body.price,
      description:req.body.description,
    });

    // Save the new product to the database
    await newProduct.save();
    

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
