const mongoose = require('mongoose');

mongoose.connect(
    //Your mongoDB connection string here
    , {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = mongoose;