const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const cors = require('cors');

const usersRouter = require('./routes/users');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/users', usersRouter);

const uri = 'mongodb+srv://admin:yes123@cluster0.l7jtovk.mongodb.net/mongoIntro';
mongoose.connect(uri, {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


app.listen(port, () => {
    console.log('Server started on port ' + port);
});