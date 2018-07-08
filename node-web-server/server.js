const express = require("express");
const hbs = require("hbs");

let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  
  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getFullYear", () => new Date().getFullYear());

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to Express"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Cannot handle request"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
