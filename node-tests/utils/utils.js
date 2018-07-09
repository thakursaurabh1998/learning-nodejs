const add = (a, b) => a + b;

const square = a => a * a;

const asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
};

const asyncSquare = (a, callback) => {
  setTimeout(() => {
    callback(a * a);
  }, 1000);
};

const setName = (user, fullName) => {
  const name = fullName.split(" ");
  user.firstName = name[0];
  user.lastName = name[1];
  return user;
};

module.exports = {
  add,
  square,
  setName,
  asyncAdd,
  asyncSquare
};
