const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose')

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

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)

});