const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.get("/", function (req, res) {
  res.send("hello");
    var today = new Date();
    var current = today.getDate();

    if(current === 0 || current === 6){
        res.send('<h1>Raja karo maja</h1>')
    }else{
        res.sendFile(__dirname+'/index.html');
    }



});

app.listen(3000, function () {
  console.log("start");
});
