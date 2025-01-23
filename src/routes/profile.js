const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validations")
// Profile route with userAuth middleware to authenticate and attach user to req.user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;  // user should be attached by userAuth middleware
        
        // if (!user) {
        //     return res.status(404).send("User does not exist.");
        // }

        res.send(user);  // Return the user information in the response
    } catch (err) {
        res.status(400).send("Error: " + err.message);  // Send error message
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    try{
        if (!validateEditProfileData (req)){
            throw new Error ("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json({ message: '${loggedInUser.firstName}, your profile updated..',
            data: loggedInUser,
    });
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports = profileRouter;
