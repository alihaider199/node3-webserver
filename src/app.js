// path method for providing the path for dir and from there we can manipulate the path
const geocode = require("./utils/geocode.js");
const forcast = require("./utils/forcast.js");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
// this the path of dir we need to provide
const pathDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templete/views");
const partialPath = path.join(__dirname, "../templete/partials");
// for dynamic diractory when we load dynamic page
// by default its in views dir in the root
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
// for  static diractory when we load static pages
app.use(express.static(pathDir));
app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Ali hiader" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Ali hiader" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Ali hiader" });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Ali hiader",
    errorMessage: "there no articles for help",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ Error: error });
    }
    forcast(data.cord, (error, forcastData) => {
      if (error) {
        return res.send({ Error: error });
      }
      res.send({ location: data.loc, Data: forcastData });
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "no game provide" });
  }

  console.log(req.query.search);
  res.send({ search: "products = []" });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Ali hiader",
    errorMessage: "404 page not found",
  });
});
app.listen(3000, () => {
  console.log("the server is start up");
});
