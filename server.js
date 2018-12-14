var express = require('express');
//Create an Express App
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pet_store');
var UserSchema = new mongoose.Schema({
   name: String,
})

var PetSchema = new mongoose.Schema({
   name: String,
   description: String,
   skills: String,
   likes: String,
})


mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')

//var pet = new Pet({name: 'maya', description: 'baby baboushka', skills: 'peeing', likes: 0});


//pet.save(function(err, data) {
  //if(err) {
    //console.log('mayayayayayayaya', err);
  //} else {
    //console.log('papayayayayayaya', data);
  //}
//})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
var path = require('path');
app.use(express.static( __dirname + '/public/dist/public'  ));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




app.get('/getPets', function(req, res) {
  Pet.find({}, function(err, pets) {
    res.json({message: "Success", data: pets})
  })
})

app.post('/users', function(req, res) {
  console.log('rewwqqwqwqwqwqq', req.body)
  //var user = new User({name: req.body.name, age: req.body.age});
  //user.save(function(err, data) {
    //if(err) {
      //console.log('something went wrong', err);

    //} else {
      //console.log('successfully added a user!', data);
      //res.json({message: "Success", users: data})
    //}
  //})
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
