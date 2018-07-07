console.log("starting up");

setTimeout(() => {
  console.log("inside callback");
}, 3000);

setTimeout(() => {
  console.log("second callback");
}, 0);

console.log("ending up");
