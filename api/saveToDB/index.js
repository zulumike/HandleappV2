
const { MongoClient, MongoRuntimeError } = require('mongodb');
const mongoConnection = new MongoClient(process.env.MONGO_URI);
var responseMessage = 'NA';

module.exports = async function (context, req) {
    async function dbWrite(newItem) {
        try {
            await mongoConnection.connect();
            const database = mongoConnection.db('zm');
            const collName = database.collection('handlekurv');
            await collName.drop(function(err, delOK) {
                if (err) context.log(err);
                if (delOK) context.log("Collection deleted");
        });
            // const result = await collName.insertMany(newItem);
            const result = await collName.insertMany(newItem);
            await context.log('Document stored in db with id: ', result.insertedIds);
            responseMessage = 'Saved to mongodb with id: ' + result.insertedIds;
            return true;
        }
        catch (error) {
            context.log(error);
            responseMessage = 'Error saving: ' + error;
        }
        finally {
            await mongoConnection.close;
            context.log('DB Closed');
        }
    };


    const name = (req.query.name || (req.body && req.body.name));
    context.log('Saving to MongoDB: ',context.req.body);
    await dbWrite(req.body);
    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}