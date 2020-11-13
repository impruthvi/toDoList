const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    day: "numeric",
    weekday: "long",
    month: "long",
  };

  var day = today.toLocaleDateString("eg-US", options);

  res.render("list", { kidOfday: day, newListItem: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("start");
});
