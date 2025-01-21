const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validations');
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        await user.save();
        res.send("User added success...");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});
app.post("/login", async (req, res) => {
    try {
        // Validation of data
      

        const {emailId, password } = req.body;

        // Encrypt password
        const user = await User.findOne({emailId: emailId});
        if(!user)
            {
                throw new Error("Invalid credentials");
            }
           const isPasswordValid = await bcrypt.compare(password, user.password);
           if(isPasswordValid)
            {
                res.send("Login successful....");
            }
            else
            {
                throw new Error("password not correct..");
            }
        
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});
app.get("/user", async(req,res) =>{
    const userEmail = req.body.emailId;
    try{
        console.log(userEmail);
        const user = await User.findOne({emailId: userEmail});

    if(!user)
    {
        res.status(404).send("User not found..");
    }
    else{
        res.send(user);
    }

}
catch(err)
{
    res.status(400).send("Error access the user ");   
}
})

connectDB().then(() => {
    console.log("Database connected...");
    app.listen(3000, () => {
        console.log("Server is listening on 3000...");
    });
}).catch(err => {
    console.log("Database cannot be connected...");
});
