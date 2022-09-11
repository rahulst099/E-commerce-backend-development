const OrderDetail = require("../models/orderDetail");
const OrderItems = require("../models/orderItems");
const Product = require("../models/product");

function createOrder(req, res) {
    let data = req.body;
    if (data.userId && data.productId) {
        Product.getProductDetails(data, function (err, product) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: "Error in creating the order"
                });
            }
            OrderDetail.findOrderByUser(data, function (err1, order) {
                if (err1) {
                    console.log(err);
                    return res.status(500).send({
                        success: false,
                        message: "Error while creating the order"
                    });
                }
                if (order.length > 0) {
                    data.total = parseInt(order[0].total, 10) + parseInt(product[0].price, 10);
                    data.orderId = order[0].ID;
                    OrderDetail.editOrder(data, function (err2, orderDetail) {
                        if (err2) {
                            console.log(err);
                            return res.status(500).send({
                                success: false,
                                message: "Error  while editing the order"
                            })
                        }
                        OrderItems.addOrderItem(data, function (err3, orderItems) {
                            if (err3) {
                                console.log(err);
                                return res.status(500).send({
                                    success: false,
                                    message: "Error in while adding the order"
                                });
                            }
                            return res.status(200).send({
                                success: true,
                                message: "successfully created order",
                                orderDetails: {
                                    orderId: order[0].ID
                                }
                            })
                        })
                    });
                } else {
                    data.total = parseInt(product[0].price, 10);
                    OrderDetail.addOrder(data, function (err2, orderDetail) {
                        if (err2) {
                            console.log(err);
                            return res.status(500).send({
                                success: false,
                                message: "Error in creating the order"
                            });
                        }
                        data.orderId = orderDetail.insertId;
                        OrderItem.addOrderItem(data, function (err3, orderItems) {
                            if (err3) {
                                console.log(err);
                                return res.status(500).send({
                                    success: false,
                                    message: "Error in while  creating the order "
                                })
                            }
                            return res.status(200).send({
                                message: "Successfully order is created",
                                success: true,
                                orderDetails: {
                                    orderId: orderDetail[0].insertId
                                }
                            })
                        })
                    })
                }
            })
        })
    } else {
        return res.status(400).send({
            success: false,
            message: "Invalid data is passed"
        })
    }
}

function getOrderDetails(req, res) {
    let data = req.body;
    if (data.userId) {
        OrderDetail.listOrderDetails(data, function (err, result) {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "Not able to fetch the data"
                })
            }
            return res.status(200).send({
                success: true,
                message: "Fetched the order details",
                orderDetails: result
            })
        })
    }
}

function editOrderDetails(req, res) { 
    
}

module.exports = {
    createOrder,
    getOrderDetails,
    editOrderDetails
}