const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cartItems: [{ name: String, quantity: Number, price: Number }],
  paymentDetails: {
    cardName: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
