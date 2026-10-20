const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://claudekaswebtech_db_user:37Cal9xMZHSjCNXj@cluster0.llyyanf.mongodb.net/furniture_db';
const dbConnection = ()=>{
    try {
        mongoose.connect(dbURI);
        mongoose.connection.on('connected', ()=>{
            console.log('Mongoose is connected');
        });
        mongoose.connection.on('error', (err)=>{
            console.log(`Mongoose connection error: ${err}`);
        });
        mongoose.connection.on('disconnected', ()=>{
            console.log('Mongoose is disconnected');
        });
    }catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
}
module.exports = dbConnection;