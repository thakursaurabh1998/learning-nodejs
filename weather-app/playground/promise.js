const examplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is resolved");
  }, 3000);
  reject("This is rejected");
});

examplePromise.then(
  message => {
    console.log(`Resolved ${message}`);
  },
  message => {
    console.log(`Rejected ${message}`);
  }
);
