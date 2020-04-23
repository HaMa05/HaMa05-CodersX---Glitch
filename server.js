// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const pug = require('pug');
app.set('views', './views');
app.set('view engines', 'pug');
// https://expressjs.com/en/starter/basic-routing.html
// app.get('/', (request, response) => {
//   response.send('I love CodersX');
// });

var todos = [
  {name:'Đi chợ', id: 1},
  {name:'Nấu cơm', id: 2},
  {name:'Học code trên CodersX', id: 3}
];

app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (request, response) => {
  response.render('index.pug');
})

app.get('/', (req, res) => {
	res.render('index.pug', {
    todos: todos 
  });
});

app.get('/todos', (req, res) => {
  var q = req.query.q;
  var matchSearch = todos.filter((animal) => {
    return animal.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render('index.pug', {
    animals: matchSearch 
  });
})


// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
