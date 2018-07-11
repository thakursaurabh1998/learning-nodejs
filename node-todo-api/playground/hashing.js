const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

const token = jwt.sign(data, "123abc");

const decoded = jwt.verify(token, "123abc");
console.log(token, decoded);
// jwt.verify();

// const message = "I am user number 3";

// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
