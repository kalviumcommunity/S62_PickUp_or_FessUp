if(process.env.NODE_ENV !=='PRODUCTION'){
    require('dotenv').config()
}
const mongoClient = require('mongodb').MongoClient;

const connection = new mongoClient(process.env.MONGO_URL)

async function getDB(){
    const db = connection.db('PickUp_Or_FessUp')
    db = db.collection('user')
    return db.collection(user)
}

module.exports = {getDB,connection}