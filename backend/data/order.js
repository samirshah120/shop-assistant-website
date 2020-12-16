const mongoCollections = require('../config/mongoCollections');
const { json } = require('express');
const order = mongoCollections.order;
const { ObjectId } = require("mongodb").ObjectID;
const elasticSearch = require("./elasticSearch");


let exportedMethods = {

    async addToOrder(itemobject) {
     // let neworderItems =[]
     // neworderItems=itemobject.orderItems
     /* {
      _id:ObjectId(),
      product:ObjectId(itemobject.orderItems.product),
      name:itemobject.orderItems.name,
      image:itemobject.orderItems.image,
      price:itemobject.orderItems.price,
      qty:itemobject.orderItems.qty


    }, */
        const newOrder = {
        orderItems: itemobject.orderItems,
        userInfo: itemobject.userInfo,
        shipping: itemobject.shipping,
        payment: itemobject.payment,
        itemsPrice: itemobject.itemsPrice,
        taxPrice: itemobject.taxPrice,
        shippingPrice: itemobject.shippingPrice,
        totalPrice: itemobject.totalPrice,
      };
      const orderCollection = await order();
      const neworderInsertInformation = await orderCollection.insertOne(newOrder);
    if (neworderInsertInformation.insertedCount === 0) throw 'Insert failed!';
    const newId = neworderInsertInformation.insertedId;
    const orderinfo = await this.getOrder(newId);
		return orderinfo;
},
async getOrder(id){
  if (!id) throw 'You must provide an id to search for';
  
  id = ObjectId(id);
 // console,log("i here");
  const orderCollection = await order();
      const ordernew = await orderCollection.findOne({ _id: id });
  

  if (ordernew === null) throw 'No order with that id';

  return ordernew;
}
}
module.exports = exportedMethods;