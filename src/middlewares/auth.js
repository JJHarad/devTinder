const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Extract token from cookies
        const { token } = req.cookies;

        // If no token is provided, return an error
        if (!token) {
            console.error('Token missing in request cookies');
            return res.status(401).send("Access denied. No token provided.");
        }

        // Verify and decode the JWT token
        const decodeObj = jwt.verify(token, "DEV@Tinder$790");  // Use an environment variable for the secret
        const { _id } = decodeObj;

        // Find the user based on the decoded user ID
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send("Token has expired.");
        }
        console.error('JWT verification failed:', err);
        return res.status(401).send("Invalid or expired token.");
    }
};

module.exports = { userAuth };
