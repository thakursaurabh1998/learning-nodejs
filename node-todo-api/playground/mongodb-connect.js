const { MongoClient, ObjectID } = require("mongodb");

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

    // db.collection("todos").insertOne(
    //   {
    //     text: "Complete this",
    //     completed: false
    //   },
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert todo" + error);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    db.collection("users").insertOne(
      {
        name: "Saurabh Thakur",
        age: 20,
        location: "CHD"
      },
      (error, result) => {
        if (error) return console.log("Unable to insert todo" + error);
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    );

    client.close();
  }
);
