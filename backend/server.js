const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/TodoModel.js');
const bodyParser = require('body-parser');
var cors = require('cors')
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");

require('dotenv/config');

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }catch(err){
        res.json({message: err})
    }
})

app.post('/', async (req, res) => {
   
    const todo = new Todo({
        completed: req.body.completed,
        id: req.body.id,
        text: req.body.text,
        toggleEdit: req.body.toggleEdit
    })
    try{
    const savedTodo = await todo.save()
    res.json(savedTodo)
    }catch(err){
        res.json({message: err})
    }
})


app.delete('/:id', (req, res) => {
   
    Todo.findByIdAndDelete(req.params.id)
    .then((res) => { 
    })
    .catch((e) => {
     });
     res.send('delete');
})

app.patch('/:id', async (req, res) => {
    
    const updatedEmployee = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true})

    res.send('update');
})

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  });

  app.get("/user", (req, res) => {
    res.send(req.user); 
  });


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },  () => { console.log('connected to DB!')})

app.listen(4000, () => console.log("hello from server"))