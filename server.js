const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

//DB Config

const db = require('./config/keys').mongoURI;

//Connect to Mongo

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('connecter'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/words', require('./routes/api/words'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started ${port}`))