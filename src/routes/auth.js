const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require('../utils/validations');

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find user by email
        const user = await User.findOne({ emailId: emailId });
        
        // Check if user exists and is a Mongoose document
        if (!user) {
            return res.status(400).send("Invalid credentials");
        }
        
        // Log the user to check if it has the getJWT method
        console.log(user); // This should show the user object with methods like getJWT
        
        // Validate password
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            // Generate JWT and send it back in a cookie
            const token = user.getJWT(); // No 'await' needed here
            res.cookie("token", token,{
                expires: new Date(Date.now()+8*3600000),
            });

            res.send("Login successful...");
        } else {
            res.status(401).send("Incorrect password");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/logout", async (req,res) =>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout successful...");
});

module.exports = authRouter;