var dbConnection = require("../config/mongoConnection");
var productsData = require('../data/products')
async function main() {
    var db = await dbConnection();
    await db.dropDatabase();
    let pr1 = {
      "name": "jeans",
      "category": "clothes",
      "size" : "s",
      "gender": "male",
      "brand" : "shop and stop",
      "price" : 100,
      "details" : "Sold by Samir",
      "url": "jeans.jpg"
    };
    let pr2 = {
      "name": "t-shirt",
      "category": "clothes",
      "size" : "m",
      "gender": "female",
      "brand" : "shop and stop",
      "price" : 150,
      "details" : "Sold by Samir",
      "url": "tshirt.jpg"
    };
    let pr3 = {
      "name": "cargo pant",
      "category": "clothes",
      "size" : "l",
      "gender": "male",
      "brand" : "shop and stop",
      "price" : 200,
      "details" : "Sold by Samir",
      "url": "cargo-pant.jgp"
    };
    let pr4 = {
      "name": "yoga pant",
      "category": "clothes",
      "size" : "s",
      "gender": "female",
      "brand" : "shop and stop",
      "price" : 250,
      "details" : "Sold by Samir",
      "url": "yoga-pant.jgp"
    };
    let pr5 = {
      "name": "jacket",
      "category": "clothes",
      "size" : "xl",
      "gender": "male",
      "brand" : "shop and stop",
      "price" : 350,
      "details" : "Sold by Samir",
      "url": "jacket.jgp"
    };
    let pr6 = {
      "name": "t-shirt",
      "category": "clothes",
      "size" : "m",
      "gender": "male",
      "brand" : "shop and stop",
      "price" : 170,
      "details" : "Sold by Samir",
      "url": "tshirt.jpg"
    };
    //grocery
    let pr7 = {
      "name": "milk",
      "category": "groceries",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 10,
      "details" : "Sold by Madhu",
      "url": "milk.jgp"
    };
    let pr8 = {
      "name": "bread",
      "category": "groceries",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 20,
      "details" : "Sold by Madhu",
      "url": "bread.jgp"
    };
    let pr9 = {
      "name": "cheese",
      "category": "groceries",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 30,
      "details" : "Sold by Madhu",
      "url": "cheese.jgp"
    };
    let pr10 = {
      "name": "cereal",
      "category": "groceries",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 40,
      "details" : "Sold by Madhu",
      "url": "cereal.jgp"
    };
    let pr11 = {
      "name": "ice cream",
      "category": "groceries",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 50,
      "details" : "Sold by Madhu",
      "url": "ice-cream.jgp"
    };
    let pr12 = {
      "name": "Refrigerator",
      "category": "electronics",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 5000,
      "details" : "Sold by Rajit",
      "url": "refrigerator.jgp"
    };
    let pr13 = {
      "name": "TV",
      "category": "electronics",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 4000,
      "details" : "Sold by Rajit",
      "url": "tv.jgp"
    };
    let pr14 = {
      "name": "ps5",
      "category": "electronics",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 3000,
      "details" : "Sold by Rajit",
      "url": "ps5.jgp"
    };
    let pr15 = {
      "name": "camera",
      "category": "electronics",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 2000,
      "details" : "Sold by Rajit",
      "url": "camera.jgp"
    };
    let pr16 = {
      "name": "laptop",
      "category": "electronics",
      "size" :null,
      "gender":null,
      "brand" : "shop and stop",
      "price" : 1000,
      "details" : "Sold by Rajit",
      "url": "laptop.jgp"
    };

    var product1 = await productsData.addProduct(pr1);
    var product2 = await productsData.addProduct(pr2);
    var product3 = await productsData.addProduct(pr3);
    var product4 = await productsData.addProduct(pr4);
    var product5 = await productsData.addProduct(pr5);
    var product6 = await productsData.addProduct(pr6);
    var product7 = await productsData.addProduct(pr7);
    var product8 = await productsData.addProduct(pr8);
    var product9 = await productsData.addProduct(pr9);
    var product10 = await productsData.addProduct(pr10);
    var product11 = await productsData.addProduct(pr11);
    var product12 = await productsData.addProduct(pr12);
    var product13 = await productsData.addProduct(pr13);
    var product14 = await productsData.addProduct(pr14);
    var product15 = await productsData.addProduct(pr15);
    var product15 = await productsData.addProduct(pr16);

    await db.serverConfig.close();
}
main();