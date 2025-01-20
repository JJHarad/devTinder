const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
// app.use("/", (req,res)=>{
//     res.send("ggugu")
// });
// app.get("/admin/getAllData", (req,res)=>{
//     //Logic of fetching all data
//     res.send("All Data sent");
// });
app.post("/signup", async(req,res) => {
    const user = new User({
        firstName: "Jidd",
        lastName: "meee",
        emailId: "jid@gmail.com",
        password:"dhcsjh"
    })
    await user.save();
    res.send("User added success...")
})
connectDB().then(()=>{
    console.log("Database connected...")
    app.listen(3000, () =>{
        console.log("Server is listening on 3000...")
    });
}).catch(err=>{
    console.log("Database cannot be connected...")
})
