const productsRoutes = require("./products")

const constructorMethod = app => {
    app.use("/products", productsRoutes);
    app.use("*", (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;