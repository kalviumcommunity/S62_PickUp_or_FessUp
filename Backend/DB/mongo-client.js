if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').config()
}
const mongoClient = require('mongodb').MongoClient;

const connection = new mongoClient(process.env.MONGO_URL)

async function getDB(){
    const db = connection.db('PickUp_Or_FessUp')
    const collection = db.collection('user')
    return collection
}

module.exports = {getDB,connection}