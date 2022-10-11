const { MongoClient, MongoRuntimeError } = require('mongodb');
const mongoConnection = new MongoClient(process.env.MONGO_URI);
var data = [];

module.exports = async function (context, req) {
    async function dbRead() {
        try {
            await mongoConnection.connect();
            const database = mongoConnection.db('zm');
            const collName = database.collection('handlekurv');
            data = await collName.find({}).toArray();
            context.log('data is: ',data);
        }
        catch (error) {
            context.log(error);
        }
        finally {
            await mongoConnection.close;
            context.log('DB Closed');
        }
    };

    context.log('Reading from MongoDB');
    await dbRead();
    context.res = {
        status: 200, /* Defaults to 200 */
        body: data
    };
}