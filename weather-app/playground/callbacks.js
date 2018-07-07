const getUser = (id, callback) => {
  const user = {
    id,
    name: "Saurabh"
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(16, userObj => {
  console.log(userObj);
});
