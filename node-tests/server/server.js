const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(404).send({
    error: "Page not found",
    name: "Todo app v1.0"
  });
});

app.get("/you", (req, res) => {
  res.send([
    {
      firstName: "saurabh",
      age: 20
    },
    {
      firstName: "chandu",
      age: 20
    }
  ]);
});

app.listen(3000);

module.exports = {
  app
};
