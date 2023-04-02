const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const cors = require('cors');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')
const profileRouter = require('./routes/profile');
const quotesRouter = require('./routes/quotes');


require('dotenv').config();



app.use(express.json());
app.use(cors());
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/quotes', quotesRouter);

const uri = 'mongodb+srv://admin:' + process.env.DB_PASSWORD + '@cluster0.l7jtovk.mongodb.net/MongoIntro';
mongoose.connect(uri, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


let server = app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = { app, server };