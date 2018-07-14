require("./config");

const { Todo, User } = require("./models/models");
const { authenticate } = require("./middleware/authenticate");

const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const port = process.env.PORT;

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

app.post("/users", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);

  const user = new User(body);

  user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => res.status(400).send(err));
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {
  const body = _.pick(req.body, ["email", "password"]);

  // User.findOne({ email: body.email }).then(user => {
  //   bcrypt.compare(body.password, user.password, (err, result) => {
  //     if (err) console.log(err);
  //     if (result)
  //       res.status(200).send({ email: user.email, password: user.password });
  //     else res.status(401).send();
  //   });
  // });
  User.findByCredentials(body.email, body.password)
    .then(user => {
      res.send(user);
    })
    .catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = { app };
