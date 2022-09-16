const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const mongoConnection = new MongoClient(process.env.MONGO_URI);

 module.exports = mongoConnection;