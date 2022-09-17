
const { MongoClient, MongoRuntimeError } = require('mongodb');
const mongoConnection = new MongoClient(process.env.MONGO_URI);
var responseMessage = 'Save NOT complete';

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
            const result = await collName.insertMany(newItem);
            // await context.log('Document stored in db with id: ', result.insertedIds);

            return true;
        }
        catch (error) {
            context.log(error);
        }
        finally {
            await mongoConnection.close;
        }
    };


    const name = (req.query.name || (req.body && req.body.name));
    context.log('Saving to MongoDB: ',context.req.body);
    dbWrite(req.body);
    var responseMessage = 'Save completed';
    context.res = {
        status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}