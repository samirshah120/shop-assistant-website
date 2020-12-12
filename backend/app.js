const express = require("express");
const app = express();
const configRoutes = require("./routes");
var cors = require('cors')
var im = require('imagemagick');
var fs = require('fs');
var path = require('path');
app.use(cors())
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
configRoutes(app);
let moveFrom = "../src/img/src_image";
let moveTo = "../src/img/dst"
//Image compress using ImageMagick
fs.readdir(moveFrom, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    return;
  }

  files.forEach(function (file, index) {
    // Make one pass and make the file complete
    var fromPath = path.join(moveFrom, file);
    var toPath = path.join(moveTo, file);

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }

      if (stat.isFile())
        console.log("'%s' is a file.", fromPath);
      else if (stat.isDirectory())
        console.log("'%s' is a directory.", fromPath);
        im.resize({
          srcData: fs.readFileSync(fromPath, 'binary'),
          width:   256
        }, function(err, stdout, stderr){
          if (err) throw err
          fs.writeFileSync(toPath, stdout, 'binary');
          console.log("Resized file '%s' to '%s'.", fromPath, toPath);
        });
    });
  });
});


app.listen(5000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:5000");
});

