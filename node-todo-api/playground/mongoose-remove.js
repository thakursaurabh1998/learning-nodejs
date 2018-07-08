const { Todo } = require("../server/models/models");
const { mongoose } = require("../server/db/mongoose");

const id = "5b41e86828a9a65281f6b09f";

//removes all
Todo.remove({}).then(todos => console.log(todos));

//finds single object by any property, removes and return it
Todo.findOneAndRemove({ _id: id }).then(todo => console.log(todo));

//finds single object by id, removes and return it
Todo.findByIdAndRemove({ _id: id }).then(todo => console.log(todo));
