const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Database connected...");
    app.listen(3000, () => {
        console.log("Server is listening on 3000...");
    });
}).catch(err => {
    console.log("Database cannot be connected...");
});

// app.post("/signup", async (req, res) => {
//     try {
//         // Validation of data
//         validateSignUpData(req);

//         const { firstName, lastName, emailId, password } = req.body;

//         // Encrypt password
//         const passwordHash = await bcrypt.hash(password, 10);
//         console.log(passwordHash);

//         const user = new User({
//             firstName, lastName, emailId, password: passwordHash
//         });

//         await user.save();
//         res.send("User added success...");
//     } catch (err) {
//         res.status(400).send("Error saving the user: " + err.message);
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         const { emailId, password } = req.body;

//         // Encrypt password
//         const user = await User.findOne({ emailId: emailId });
//         if (!user) {
//             throw new Error("Invalid credentials");
//         }

//         const isPasswordValid = await user.validatePassword(password);
//         if (isPasswordValid) {
//             const token = await user.getJWT();
//             res.cookie("token", token);
//             res.send("Login successful....");
//         } else {
//             res.status(401).send("Incorrect password"); // Corrected error handling
//         }
//     } catch (err) {
//         res.status(400).send("Error : " + err.message);
//     }
// });

// app.get("/profile",userAuth, async (req, res) => {
//    try{
   
//     const user = req.user;
//     if(!user)

//     {
//         throw new Error("User does not exist ");
//     }

//     res.send(user);
// }
// catch (err) {
//     res.status(400).send("Error "+ err.message);
// }
// });

// app.get("/user", async (req, res) => {
//     const userEmail = req.query.emailId; // Corrected to use query params for GET request
//     try {
//         console.log(userEmail);
//         const user = await User.findOne({ emailId: userEmail });

//         if (!user) {
//             res.status(404).send("User not found..");
//         } else {
//             res.send(user);
//         }
//     } catch (err) {
//         res.status(400).send("Error accessing the user");
//     }
// });
