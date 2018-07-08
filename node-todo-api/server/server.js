const { Todo } = require("./models/models");

const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

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
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => res.send({ todos }))
    .catch(err => res.status(400).send(err));
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectID.isValid(id) == false) return res.status(404).send();

  Todo.findById(id)
    .then(todo => {
      if (!todo) res.status(404).send();
      else res.send(todo);
    })
    .catch(err => res.send(err));
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectID.isValid(id) == false) return res.status(404).send();

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) res.status(404).send();
      else res.send(todo);
    })
    .catch(err => res.send(err));
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectID.isValid(id) == false) return res.status(404).send();

  const body = _.pick(req.body, ["text", "completed"]);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    {
      new: true
    }
  )
    .then(todo => {
      if (!todo) res.status(404).send();
      else res.send(todo);
    })
    .catch(err => res.send(err));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = { app };
