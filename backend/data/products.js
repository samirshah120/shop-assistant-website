const mongoCollections = require('../config/mongoCollections');
const { json } = require('express');
const products = mongoCollections.products;
const { ObjectId } = require("mongodb").ObjectID;
let exportedMethods = {
async getAllproducts() {
    const productsCollection = await products();
    const allproductsList = await productsCollection.find({}).toArray();
    if (!allproductsList) throw 'No products in system!';
    return allproductsList
  },
async addProduct(newProduct) {
    const productsCollection = await products();
    const newInsertInformation = await productsCollection.insertOne(newProduct);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getProductById(newInsertInformation.insertedId);
},
async getProductById(id) {
    id = ObjectId(id)
    const productsCollection = await products();
    const product = await productsCollection.findOne({_id: id});
    return product
  },
}
module.exports = exportedMethods;