//JTaRKRWZLMVEUqlr
// mongodb+srv://jidnyaharad11:JTaRKRWZLMVEUqlr@namastedev.4m1qm.mongodb.net/
const mongoose = require("mongoose")
const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://jidnyaharad11:JTaRKRWZLMVEUqlr@namastedev.4m1qm.mongodb.net/devTinder"
    );
}
module.exports = connectDB;