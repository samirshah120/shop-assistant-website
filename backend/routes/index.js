const productsRoutes = require("./products")
const orderRoutes = require("./order")

const constructorMethod = app => {
    app.use("/products", productsRoutes);
    app.use("/order", orderRoutes);
    app.use("*", (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;