const express = require('express');
const router = express.Router();
const data = require('../data');
const productsData = data.products;
const orderData = data.order;
const elasticSearch = require("../data/elasticSearch");

router.post("/", async (req, res) => {
  console.log(req.body);
    const newOrder = {
      orderItems: req.body.orderItems,
      userInfo: req.body.userInfo,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    };
    console.log(newOrder)
    const newOrderCreated = await orderData.addToOrder(newOrder);

    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
  });


  //get rder details
  router.get("/:id", async (req, res) => {

    if(!req.params.id) throw "provide id"
    const getdetails = await orderData.getOrder(req.params.id);
    
    res.status(201).send(getdetails);
  });
module.exports = router