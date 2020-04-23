// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
app.set('views', './views');
app.set('view engines', 'pug');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html

var todos = [
  {name:'Đi chợ', id: 1},
  {name:'Nấu cơm', id: 2},
  {name:'Học code trên CodersX', id: 3}
];

// app.get('/todos', (request, response) => {
//   response.render('index.pug');
// })

app.get('/', (req, res) => {
	res.render('index.pug', {
    todos: todos 
  });
});

// get data
app.get('/todos', (req, res) => {
  var q = req.query.q;
  var matchSearch = todos.filter((todo) => {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('index.pug', {
    todos: matchSearch 
  });
})

// post data
app.post('/todos/create', (req, res) => {
  todos.push(req.body); 
  res.redirect('back');
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
