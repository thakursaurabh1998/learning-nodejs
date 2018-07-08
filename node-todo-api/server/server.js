const { Todo, User } = require("./models/models");

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

let app = express();

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => console.log(doc))
    .catch(err => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
