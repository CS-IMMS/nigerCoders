const express = require('express');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/api/users')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

// db Config
const db = require('./config/Key').mongoURI;

// connect to mongoDb
mongoose
.connect(db)
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/' , (req, res) => res.send('Hello!'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log(`Server running on port ${port}`))
