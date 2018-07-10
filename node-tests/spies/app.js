const db = require("./db");

module.exports.handleSignUp = (username, password) => {
  db.saveUser({ username, password });
};
