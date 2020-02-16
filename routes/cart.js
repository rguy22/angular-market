var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },

  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "products", required: true },
      name: { type: String },
      quantity: { type: Number }
    }
  ],

  CartPrice: {
    type: Number
  }
});

const Cart = mongoose.model("Cart", cartSchema);

router.get("/", async (_, res) => {
  const products = await Cart.find();
  res.send(products);
});

router.post(
  "/newCart",
  [
    check("userId", "userId is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const cart = new Cart({
      userId: req.body.userId,
      date: new Date(),
      isOpen: true,
      CartPrice: 0
    });
    cart
      .save()
      .then(cart => {
        res.status(200).json({
          msg: "Cart Created",
          cart: cart
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(errors);
      });
  }
);

router.put("/updateCartStatus/:id", async (req, res) => {
  Cart.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Cart.findOne({ _id: req.params.id }).then(data => {
        res.status(200).json(data);
      });
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

router.put("/deleteProductCart/:id", async (req, res) => {
  Cart.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { products: { _id: req.body._id } } }
  )
    .then(() => {
      Cart.findOne({ _id: req.params.id }).then(data => {
        res.status(200).json(data);
      });
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

router.put("/addProductToCart/:cartId", async (req, res) => {
  Cart.findOne({
    _id: req.params.cartId,
    products: { $elemMatch: { _id: req.body._id } }
  })
    .then(product => {
      if (product) {
        Cart.updateOne(
          { _id: req.params.cartId, "products._id": req.body._id },
          {
            $set: { "products.$.quantity": req.body.quantity }
          }
        ).then(() => {
          Cart.findById(req.params.cartId).then(cart => {
            return res.status(200).json(cart);
          });
        });
      } else {
        Cart.findOneAndUpdate(
          { _id: req.params.cartId },
          {
            $push: {
              products: {
                _id: req.body._id,
                quantity: req.body.quantity
              }
            }
          },
          { new: true }
        ).then(() => {
          Cart.findOne({ _id: req.params.cartId }).then(cart => {
            res.status(200).json(cart);
          });
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
