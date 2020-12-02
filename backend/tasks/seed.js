var dbConnection = require("../config/mongoConnection");
var productsData = require('../data/products')
async function main() {
    var db = await dbConnection();
    await db.dropDatabase();
    let pr1 = {
      "name": "jeans",
      };
    let pr2 = {
        "name": "t shirt",
    };
    var product1 = await productsData.addProduct(pr1);
    var product2 = await productsData.addProduct(pr2);
    await db.serverConfig.close();
}
main();