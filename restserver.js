/**
* restserver.js
* Minimum rest server using express
* Pello Altadill - http://pello.io
*/
var express = require('express');
var bodyParser = require('body-parser');
// Fake DB
var users = [{id: 1, username: 'esnowden', email: 'ed@kgb.ru'},
            {id: 2, username: 'jassange', email: 'julian@gob.pe'},
            {id: 3, username: 'eugene', email: 'mrkrabs@krustykrab.biz'},
            {id: 4, username: 'bob', email: 'bob@bikini.bottom'}];

var app = express();

// If we want to use post data:
app.use(bodyParser());

// We set routes
//routes(app);

// We set static content
app.use(express.static('./'));

// Begin CRUD operations
// 0. Show all
app.get('/api/users', function (req, res) {
        res.send({result: 'OK', data: users});
});

// 1. Select one
app.get('/api/user/:id', function (req, res) {
        var _id = req.param('id');
        for (var i=0;i<users.length;i++) {
          if (users[i].id == _id) {
            res.send({result: 'OK', data: users[i]});
            return;
          }
        }
        res.send({result: 'error'});
});

// 2. Save one
app.post('/api/user/save', function (req, res) {
  var _id = (users.length+1);
  var user = { id: _id, username: req.body.username, email: req.body.email};
  users.push(user);
  res.send({result: 'OK'});
});

// 3. Update user
app.put('/api/user/update', function (req, res) {
  var user = { id: req.body.username, username: req.body.username, email: req.body.email};
  for (var i=0;i<users.length;i++) {
    if (users[i].id == user.id) {
      users[i] = user;
      res.send({result: 'OK'});
      return;
    }
  }
  res.send({result: 'error'});
});

// 4. Delete user
app.delete('/api/user/delete/:id', function (req, res) {
        var _id = req.param('id');
        for (var i=0;i<users.length;i++) {
          if (users[i].id == _id) {
            users.shift(i,1);
            console.log(users);
            res.send({result: 'OK'});
            return;
          }
        }
        res.send({result: 'error'});
});

// And there we go, listening on port 3000
app.listen(3000, function () {
    console.log('now listening on http://localhost:3000');
});
