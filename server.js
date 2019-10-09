const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();



// Bodyparser Middleware
app.use(bodyParser.json());

//DB Config

const db = require('./config/keys').mongoURI;

//Connect to Mongo

mongoose
    .connect(db)
    .then(() => console.log('connecter'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/words', require('./routes/api/words'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started ${port}`))