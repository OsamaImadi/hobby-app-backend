const mongoose = require('mongoose');
const config = require('config');




module.exports = function(){
    mongoose.connect( 'mongodb://localhost/hobby-app', { useNewUrlParser: true, useUnifiedTopology: true  });
    mongoose.connection.once('open',()=>{
        // winston.info('Connection made');
    }).on('error', (error)=>{
        console.log('Connection error', error);
    });
} 

//