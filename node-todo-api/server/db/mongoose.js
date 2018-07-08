const mongoose = require("mongoose");

const url =
  // "mongodb://thakursaurabh1998:helloworld123@ds131531.mlab.com:31531/todoapp";
  "mongodb://127.0.0.1:27017/todoapp";

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

module.exports = { mongoose };
