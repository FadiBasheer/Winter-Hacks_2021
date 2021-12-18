const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Saga:SOUP312@cluster0.ldzkt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
});

mongoose.collection('SOUP').insertOne({
    email: 'test@test.com',
    username: 'Saga',
    password: '123'
})