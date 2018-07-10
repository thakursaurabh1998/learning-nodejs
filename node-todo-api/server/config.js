var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/todoapp";
} else if (env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/todoapptest";
} else if (env === "production") {
  process.env.MONGODB_URI =
  "mongodb://thakursaurabh1998:helloworld123@ds131531.mlab.com:31531/todoapp";
}
