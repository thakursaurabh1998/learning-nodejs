const { Todo, User } = require("../../models/models");

const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const todos = [
  {
    _id: new ObjectID(),
    text: "First item"
  },
  {
    _id: new ObjectID(),
    text: "Second item",
    completed: true,
    completedAt: 33
  }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "hello@hello.com",
    password: "samplePass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userOneId, access: "auth" }, "supersecretsalt")
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "world@hello.com",
    password: "samplePass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userOneId, access: "auth" }, "supersecretsalt")
          .toString()
      }
    ]
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  users,
  populateUsers,
  populateTodos
};
