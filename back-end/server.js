const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
let cors = require('cors')

 // Use this after the variable declaration



const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile');

const app = express();
// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
// db Config
const db = require('./config/Key').mongoURI;

// connect to mongoDb
mongoose
.connect(db)
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));

// passport Middleware
app.use(passport.initialize());

// Passport Config

require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log(`Server running on port ${port}`))

// {
//     "id": "63e173c5113b8fdc7304440b",
//     "email": "maitreimms@gmail.com",
//     "role": "admin",
//     "iat": 1676644099,
//     "exp": 1676647699
//   }
//encrype me this code by bcrypt 10 code = azerty