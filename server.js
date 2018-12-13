var express = require('express');
//Create an Express App
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
   name: String,
   age: Number

})
mongoose.model('User', UserSchema);
var User = mongoose.model('User')

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/public/dist/public'  ));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/users', function(req, res) {
  console.log('bataboommmmmmmmmmmmmmmmmmmmm')
  User.find({}, function(err, users) {
    res.json({message: "Success", data: users})
    //res.render('index', {users: users});
  })
})

app.post('/users', function(req, res) {
  console.log('rewwqqwqwqwqwqq', req.body)
  var user = new User({name: req.body.name, age: req.body.age});
  user.save(function(err, data) {
    if(err) {
      console.log('something went wrong', err);

    } else {
      console.log('successfully added a user!', data);
      res.json({message: "Success", users: data})
    }
  })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
