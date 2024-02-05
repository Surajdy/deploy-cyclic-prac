const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image:{ type :String},
  // Add other fields as needed
});

const Cartmodel = mongoose.model('Cart', cartSchema);

module.exports = {Cartmodel};