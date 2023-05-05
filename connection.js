
const { MongoClient, ServerApiVersion } = require('mongodb');

async function connectToMonngoDB() {
    try {
        const uri = "mongodb+srv://admin:admin@cluster0.ksx57fv.mongodb.net/mySite";
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
          await client.connect();
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
          return uri;
    } catch (err) {
        console.error(err);
    }
}


module.exports = connectToMonngoDB;