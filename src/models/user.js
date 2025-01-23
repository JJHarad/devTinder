const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

// Add validatePassword method to check if password is valid
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

// Add getJWT method to generate a JWT for the user
userSchema.methods.getJWT = function() {
    const payload = {
        userId: this._id,
        emailId: this.emailId
    };

    const secretKey = process.env.JWT_SECRET_KEY ||  "DEV@Tinder$790"; // Use your actual secret key here
    const options = { expiresIn: '1h' }; // Set the JWT expiration time (e.g., 1 hour)

    return jwt.sign(payload, secretKey, options);
};

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
