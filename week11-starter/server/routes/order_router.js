const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');

router.post('/add-order', async (req, res) => {
  const { email, cartItems, cardNumber, expiryDate, cvv, cardName } = req.body;

  try {
    const newOrder = new Order({
      userEmail: email,
      cartItems,
      paymentDetails: {
        cardName,
        cardNumber,
        expiryDate,
        cvv,
      },
    });

    await newOrder.save();

    const user = await User.findOne({ email });
    if (user) {
      user.orders.push(newOrder._id);
      await user.save();
    }

    res.status(200).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error processing order', error: error.message });
  }
});

router.get('/get-orders/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const orders = await Order.find({ userEmail: email });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

router.put('/update-card-details/:orderId', async (req, res) => {
  const { cardName, cardNumber, expiryDate, cvv } = req.body;
  const orderId = req.params.orderId;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentDetails: { cardName, cardNumber, expiryDate, cvv }
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating card details:', error);
    res.status(500).json({ message: 'Error updating card details', error: error.message });
  }
});

module.exports = router;
