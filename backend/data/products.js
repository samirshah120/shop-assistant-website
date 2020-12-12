const mongoCollections = require('../config/mongoCollections');
const { json } = require('express');
const products = mongoCollections.products;
const { ObjectId } = require("mongodb").ObjectID;
const elasticSearch = require("./elasticSearch");
let exportedMethods = {
async getAllproducts(sort,category) {
  const productsCollection = await products();
  let allproductsList;
  if(sort === 'asc'){
    if(category === undefined){
      allproductsList = await productsCollection.find({}).sort({price:1}).toArray();
    }
    else{
      allproductsList = await productsCollection.find({category:category}).sort({price:1}).toArray();
    }
  }
  else if(sort === 'desc'){
    if(category === undefined){
      allproductsList = await productsCollection.find({}).sort({price:-1}).toArray();
    }
    else{
      allproductsList = await productsCollection.find({category:category}).sort({price:-1}).toArray();
    }
  }
  else{
    if(category === undefined){
      allproductsList = await productsCollection.find({}).toArray();
    }
    else{
      allproductsList = await productsCollection.find({category:category}).toArray();
    }
  }
  if (!allproductsList) throw 'No products in system!';
  const clothesList = await productsCollection.find( { category: category} ).toArray();
  await this.addSearchClothesProduct(clothesList);
  return allproductsList
  },
async addProduct(newProduct) {
    const productsCollection = await products();
    const newInsertInformation = await productsCollection.insertOne(newProduct);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return await this.getProductById(newInsertInformation.insertedId);
},

async searchClothesProduct(searchBody, res) {
  let list = await elasticSearch.searchClothes(searchBody, res);
  console.log("list: "+JSON.stringify(list));
  return list;
  
},
async addSearchClothesProduct(productList) {
  await elasticSearch.deleteAll();
  let clothesList = []
  productList.map((product) => {
    let clothes = {
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      size: product.size,
      gender: product.gender,
      brand: product.brand,
      price: product.price,
      details: product.details,
      url: product.url
    }
    clothesList.push(clothes);
  });
  elasticSearch.addClothes(clothesList);
  
},
async getProductById(id) {
  if (!id) throw 'You must provide an id to search for';
  if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

  if(typeof id === 'string'){
   id = ObjectId.createFromHexString(id);
  }
    const productsCollection = await products();
    const product = await productsCollection.findOne({_id: id});
    return product
  },
}
module.exports = exportedMethods;