const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connectToMonngoDB = require('./connection');
const bcrypt = require('bcryptjs');
const User = require('./user'); 
const path = require('path');
const routes = require('./routes/routes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.ksx57fv.mongodb.net/mySite',
    collection: 'sessions',
})

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
}));

app.use('/css', express.static(__dirname + '/public/css'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

async function start() {
    const uri = await connectToMonngoDB();
    await mongoose.connect(uri, {useNewUrlPArser: true, useUnifiedTopology: true });
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
}

start();