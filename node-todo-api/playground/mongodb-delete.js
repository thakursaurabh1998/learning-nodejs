const MongoClient = require("mongodb").MongoClient;

const url =
  // "mongodb://thakursaurabh1998:helloworld123@ds131531.mlab.com:31531/todoapp";
  "mongodb://127.0.0.1:27017";

const dbName = "todoapp";

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to database\n" + error);
    console.log("Connected to mongo server");

    const db = client.db(dbName);

    //delete many items from the table at once
    // db.collection("users")
    //   .deleteMany({name: "Saurabh Thakur"})
    //   .then(result => {
    //     console.log(JSON.stringify(result, undefined, 2));
    //   })
    //   .catch(err => console.log("Unable to fetch from database" + err));

    // //delete first item from the list of items
    // db.collection("users")
    //   .deleteOne({name: "Saurabh Thakur"})
    //   .then(result => {
    //     console.log(JSON.stringify(result, undefined, 2));
    //   })
    //   .catch(err => console.log("Unable to fetch from database" + err));

    //delete the required item and return it back to the user
    db.collection("users")
      .findOneAndDelete({name: "Saurabh Thakur"})
      .then(result => {
        console.log(JSON.stringify(result, undefined, 2));
      })
      .catch(err => console.log("Unable to fetch from database" + err));

    client.close();
  }
);
