const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
});

const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);

const itea1 = new Item({
  name: "Welcome to your todoList",
});

const item2 = new Item({
  name: "Hit the + button to aff a new list",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [itea1, item2, item3];

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItem) {
    if (foundItem.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItem: foundItem });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();
  res.redirect("/");
});


app.post('/delete',function(req,res){
  const checkeditamId = req.body.checkbox;
Item.findByIdAndRemove(checkeditamId,function(err){
  if(!err){
    console.log("deleted");
    res.redirect('/');
  }
})
})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  item.push(workItems);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("start");
});
