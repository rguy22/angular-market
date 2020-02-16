var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  totalPrice: {
    type: Number
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  orderDate: {
    type: Date
  },
  deliveryDate: {
    type: Date
  },
  creditCard: {
    type: String
  },
  products: [{ _id: String, quantity: Number }]
});

const Order = mongoose.model("Order", OrderSchema);

router.get("/", async (_, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.post(
  "/createOrder",
  [
    check("city", "city is required")
      .not()
      .isEmpty(),
    check("street", "street is required")
      .not()
      .isEmpty(),
    check("creditCard", "creditCard is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { totalPrice, city, street, date, creditCard, products } = req.body;
    const newOrder = new Order({
      totalPrice: totalPrice,
      city: city,
      street: street,
      orderDate: new Date(),
      deliveryDate: date,
      creditCard: creditCard,
      products: products
    });
    try {
      newOrder.save();
      res.status(200).json(newOrder);
    } catch {
      res.status(400).json(errors);
    }
  }
);

module.exports = router;
