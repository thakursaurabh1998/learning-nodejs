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

    db.collection("users")
      .find({name: "Saurabh Thakur"})
      .count()
      .then(docs => {
        console.log("TODOS");
        console.log(JSON.stringify(docs, undefined, 2));
      })
      .catch(err => console.log("Unable to fetch from database" + err));

    client.close();
  }
);
