const { Todo } = require("../server/models/models");
const { mongoose } = require("../server/db/mongoose");

const id = "5b41e86828a9a65281f6b09f";

//returns array
Todo.find({ _id: id }).then(todos => console.log(todos));

//returns single object
Todo.findOne({ _id: id }).then(todo => console.log(todo));

//returns single object by id
Todo.findById({ _id: id }).then(todo => console.log(todo));
