var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
//
const connectDB = require("./config/db");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var cartRouter = require("./routes/cart");
var orderRouter = require("./routes/order");

connectDB();

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

module.exports = app;
