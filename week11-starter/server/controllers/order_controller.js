const Order = require('../models/order');
const User = require('../models/user');

// Create Order - Post Request
const createOrder = async (req, res) => {
  const { email, cartItems, cardName, cardNumber, expiryDate, cvv } = req.body;

  try {
    const newOrder = new Order({
      userEmail: email,  // Ensure this is the correct field for storing email
      cartItems,
      paymentDetails: { cardName, cardNumber, expiryDate, cvv },
    });

    await newOrder.save();

    // Save the order in the user's order history
    const user = await User.findOne({ email });
    if (user) {
      user.orders.push(newOrder._id); 
      await user.save();
    }

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error placing order', details: error });
  }
};

// Get Orders for User - Get Request
const getOrders = async (req, res) => {
  const email = req.params.email;

  try {
    const orders = await Order.find({ userEmail: email }); // Make sure this matches the schema field
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update Card Details - Put Request
const updateCardDetails = async (req, res) => {
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
};

module.exports = { createOrder, getOrders, updateCardDetails };
