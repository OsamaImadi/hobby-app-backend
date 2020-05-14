const express = require('express');
const home = require('../routes/home');
const hobbies = require('../routes/hobbies');
const users = require('../routes/users');


module.exports= function(app){
    app.use(express.json());
    app.use('/',home);
    app.use('/api/users', users);
    app.use('/api/hobbies', hobbies);
}