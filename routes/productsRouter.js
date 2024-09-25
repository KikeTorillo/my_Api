const express = require('express');
const router = express.Router();
const ProductService = require('../services/productsService');
const serviceProducts = new ProductService();
router.get('/', async (req, res) => {
  try {
    const products = await serviceProducts.find();
    res.json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }

})

router.post('/', async (req, res)=>{
  const body = req.body;
  const products = await serviceProducts.create(body);
  res.json(products);
})

module.exports = router;
