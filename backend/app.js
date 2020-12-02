const express = require("express");
const app = express();
const configRoutes = require("./routes");
var cors = require('cors')
app.use(cors())
app.use(express.json());
configRoutes(app);

app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:5000");
});

