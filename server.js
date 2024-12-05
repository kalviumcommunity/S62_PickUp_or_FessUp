const express = require('express');
const app = express();
app.get("/ping",(req,res)=>{
    return res.send("This is the ping route")
})

app.listen(3000,()=>{
    console.log("Server is running on 3000")
});