const express = require("express");

let app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send('<h1>Hello world</h1>');
  res.send({
    name: "Saurabh Thakur",
    arr: [1, 3, 4]
  });
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Cannot handle request"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
