
const express = require('express');
const router = express.Router();
const { Cartmodel } = require('../model/cartdata.model');
const { Trendingmodel } = require('../model/gamedata.model');

router.get('/trending', async (req, res) => {
  try {
    const trendingData = await Trendingmodel.find();
    res.json(trendingData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/addToCart', async (req, res) => {
  try {
    const { productId, title, price,image } = req.body;
    const cartItem = new Cartmodel({ productId, title, price ,image});
    await cartItem.save();
    res.json({ success: true, message: 'Product added to the cart' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/getCart', async (req, res) => {
  try {
    const cartItems = await Cartmodel.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/removeItem/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await Cartmodel.findByIdAndDelete(itemId);
    res.json({ success: true, message: 'Item removed from the cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
