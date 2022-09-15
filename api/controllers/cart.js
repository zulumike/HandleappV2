const { MongoClient, MongoRuntimeError } = require('mongodb');
const mongoConnection = require('../models/cart');

async function dbWrite(newItem) {

    try {
        console.log('start save');
        await mongoConnection.connect();
        const database = mongoConnection.db('zm');
        const collName = database.collection('handlekurv');
        await collName.drop(function(err, delOK) {
            if (err) console.log(err);
            if (delOK) console.log("Collection deleted");
    });
        const result = await collName.insertMany(newItem);
        console.log('Document stored in db with id: ', result.insertedIds);
        return true;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await mongoConnection.close;
    }
};

exports.dbWrite2 = (req, res) => {
    console.log('Saving to MongoDB: ', req.body);
    dbWrite(req.body);
    res.status(200).json(req.body);
};