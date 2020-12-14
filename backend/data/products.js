const mongoCollections = require('../config/mongoCollections');
const { json } = require('express');
const products = mongoCollections.products;
const cart=mongoCollections.cart;
const { ObjectId } = require("mongodb").ObjectID;
const elasticSearch = require("./elasticSearch");
let exportedMethods = {
async getAllproducts() {
    const productsCollection = await products();
    const allproductsList = await productsCollection.find({}).toArray();
    if (!allproductsList) throw 'No products in system!';
    const clothesList = await productsCollection.find( { category: 'clothes'} ).toArray();
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

        //shweta, new item to user cart or wishlist based on type cart or wish
        async addToCart(prodid,userid,type){
          if(!prodid || !userid || !type)
          throw "plz provide prod id and user id and type of item adding"
          if(typeof prodid !=="string" || typeof userid !=="string" || typeof type !=="string")
          throw "input should be string"
          console.log("inside products data add to cart")
          let iscart="";
          if(type.trim===cart)
          iscart="true"
          else iscart="false"

          try{
          const cartCollection = await cart();
          let prod=await this.getProductById(prodid);
              let itemobject = {
              userid:userid,
              product_id:prod._id.toString(),
              iscart:iscart

                };
                  const neworderInsertInformation = await cartCollection.insertOne(itemobject);
                  if (neworderInsertInformation.insertedCount === 0) throw 'Insert failed!';
              }
                  catch(e){
                    throw "error adding item to cart"
                }
                return await this.getCartItemById(neworderInsertInformation.insertedId);
        },
          

         /*  //shweta get all items
          async getCartItemById(userid) {
            if(!userid || !userid)
                  throw "plz provide prod id and user id"
                  console.log("inside products data add to wishlist")
            console.log("inside products data get cart item by id")
            try{
              userid = ObjectId(userid)
            const productsCollection = await products();
            const cartCollection = await cart();
            let prod= await this.getProductById(id)
            const cartitem = await cartCollection.find({_id: userid}).toArray();
            return cartitem
            }
            catch(e){
              throw "error gettig cart item"
          }
         
            
          }, */

          //getallCart or getallwishlist by user id and type
          async getallCart(userid,type) {
            if(!userid || !userid)
                  throw "plz provide prod id and user id"
                  console.log("inside products data add to wishlist")
            console.log("inside products data get cart item by id")
            let iscart="";
          if(type.trim===cart)
          iscart="true"
          else iscart="false"
          userid = ObjectId(userid)
          let cartCollection = await cart();
          return await cartCollection.find({$and:[{_id: userid},{iscart:iscart}]}).toArray();
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
    id = ObjectId(id)
    const productsCollection = await products();
    const product = await productsCollection.findOne({_id: id});
    return product
  },
}
module.exports = exportedMethods;