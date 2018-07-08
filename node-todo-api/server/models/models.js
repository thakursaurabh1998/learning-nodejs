const { mongoose } = require("../db/mongoose");

const Todo = mongoose.model("todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const User = mongoose.model("users", {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  Todo,
  User
};
