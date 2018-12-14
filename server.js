var express = require('express');
//Create an Express App
var app = express();
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/pet_store');
var UserSchema = new mongoose.Schema({
   name: String,
})

var PetSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true
  },
  type: {
    type: String,
    minlength: 3
  },
  description: {
    type: String,
    minlength: 3
  },
  skills: {
    type: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  },
  likes: {
    type: Number
  }
})
function arrayLimit(val) {
  return val.length <= 3;
}

PetSchema.plugin(uniqueValidator);


mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')

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

app.post('/editPet', function(req, res) {
  console.log('req', req.body);
  Pet.findById(req.body._id, function(err, pet){
    pet.name = req.body.name
    pet.type= req.body.type
    pet.description = req.body.description
    pet.skills = [req.body.skill1, req.body.skill2, req.body.skill3]
    pet.save(function (err, pet) {
      if (err) {
        res.json({message: "error", data: err})
      } else {
        res.json({message: "Success", data: pet})
      }
    })
  });


  //Pet.findByIdAndUpdate(req.body._id, req.body, { runValidators: true  }, function(err, pet) {
    //if(err) {
      //res.json({message: "error", data: err})
    //} else {
      //res.json({message: "Success", data: pet})
    //}
  //})
})

app.get('/getPet/:id', function(req, res) {
  var petId = req.params.id
  Pet.findById(petId, function(err, pet) {
    res.json({message: "Success", data: pet})
  })
})

app.delete('/deletePet/:id', function(req, res) {
  var petId = req.params.id
  Pet.findByIdAndDelete(petId, function(err, pet) {
    if(err) {
      console.log('no petDelete', err);
    } else {
    res.json({message: "Success", data: pet})
    }
  })
})

app.post('/createPet', function(req, res) {
  var pet = new Pet({name: req.body.name, description: req.body.description, 
    skills: [
      req.body.skill1,
      req.body.skill2,
      req.body.skill3,
    ]
  });
  pet.save(function(err, data) {
    if(err) {
      res.json({message: "error", data: err})
    } else {
      console.log('successfully added a petpepteptepteptep!', data);
      res.json({message: "Success", pet: data})
    }
  })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
