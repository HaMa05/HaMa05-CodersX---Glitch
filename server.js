// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pug = require("pug");
app.set("views", "./views");
app.set("view engines", "pug");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ todos: [] }).write();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html

// var todos = [
//   {name:'Đi chợ', id: 1},
//   {name:'Nấu cơm', id: 2},
//   {name:'Học code trên CodersX', id: 3}
// ];

// app.get('/todos', (request, response) => {
//   response.render('index.pug');
// })

app.get("/", (req, res) => {
  res.render("index.pug", {
    todos: db.get("todos").value()
  });
});

// get data
app.get("/todos", (req, res) => {
  let todos = db.get("todos").value();
  var q = req.query.q;
  var matchSearch = todos.filter(todo => {
    return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index.pug", {
    todos: matchSearch
  });
});

//delete todo
app.get("/todos/:id/delete", (req, res) => {
  let id = req.params.id;
  
  db.get('todos')
    .remove({ id: id })
    .write();
  
  res.redirect("/");
});

// post data
app.post("/todos/create", (req, res) => {
  db.get("todos")
    .push(req.body)
    .write();
  res.redirect("back");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
