const express = require("express");
const categoryController = require("../../../SRC/controllers/categoryController");
const productController = require("../../../SRC/controllers/productController");
const userController = require("../../../SRC/controllers/userController");
const orderController = require("../../../SRC/controllers/orderController");

let router = express.Router();
router.get('/category/all', userController.isAuthenticated, categoryController.listCategories);

router.get("/product/all", userController.isAuthenticated, productController.listProducts);

router.post("/product/add", productController.addProduct);

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);

router.get("/order/details", orderController.getOrderDetails);
router.post("/order/add", orderController.createOrder);
router.post("/order/edit", orderController.editOrderDetails);
module.exports = router;