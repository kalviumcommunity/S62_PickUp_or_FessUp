const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')
const {getDB, connection}= require('./DB/mongo-client.js')
const PORT = process.env.PORT
const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
    .then(()=>{
        console.log('Connected to database')
    })
    .catch(()=>{
        console.log('Error connecting to database')
    })

app.use(express.json())

app.get("/ping",(req,res)=>{
    return res.send("This is the ping route")
})

app.get('/',async(req,res)=>{
try {
    const checkStatus = await connection.connect()
    const readyState = connection.topology.isConnected()
    ?'connected':'disconnected';
    res.send(`<h3>Database Connection Status: ${readyState}</h3>`)
} catch (error) {
    res.status(500).send({message:error.message})
}
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)

});