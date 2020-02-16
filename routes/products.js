var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);

/* GET users listing. */
router.get("/", async (_, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post("/", async (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    price: req.body.price,
    picture: req.body.picture
  });
  console.log(product);
  product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Product.findOne({ _id: req.params.id })
      .then(product => {
        res.json(product);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
});

module.exports = router;
