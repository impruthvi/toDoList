const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// mongoose.connect("mongodb://localhost:27017/todoListDB", {
mongoose.connect("mongodb+srv://impruthvi:impruthvi@todolist.wd9gx.mongodb.net/todoListDB?retryWrites=true&w=majority/todoListDB", {
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

const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

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
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });


  if(listName==='Today'){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect('/'+listName);
    })
  }

 
});

app.post("/delete", function (req, res) {
  const checkeditamId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){

    Item.findByIdAndRemove(checkeditamId, function (err) {
      if (!err) {
        console.log("deleted");
        res.redirect("/");
      }
    });

  }else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkeditamId}}},function(err,founfList){
      if(!err){
        res.redirect('/'+listName);
      }
    } )
  }

  
});

app.get("/:coustomListName", function (req, res) {
  const coustomListName = _.capitalize(req.params.coustomListName);

  List.findOne({ name: coustomListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //create new list
        const list = new List({
          name: coustomListName,
          items: defaultItems,
        });

        list.save();
        res.redirect('/'+coustomListName)
      } else {
        // show existing list

        res.render('list',{ listTitle: foundList.name, newListItem: foundList.items })
      }
    }
  });
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  item.push(workItems);
  res.redirect("/work");
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function () {
  console.log("server has started");
});
