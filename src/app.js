const express = require("express");
const app = express();
app.use((req,res)=>{
    res.send("hello from server");
})
app.listen(3000, () =>{
    console.log("Server is listening on 3000...")
})