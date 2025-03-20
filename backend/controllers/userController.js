const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


// Function to get all users
const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};


//function to register a user
const signupUser = async (req, res) => {
    try {
        const { userName, email, mobNum, password } = req.body;
        //check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new User
        const newUser = new User({
            userName,
            email,
            mobNum,
            password: hashedPassword,
        });

        await newUser.save();
        res
            .status(201)
            .json({ message: "User Registered Successfully" });
    } catch (error) {
        console.log("Error to create new user", error);
        res.status(500).json({ message: "Server Error" });
    }
};


//function to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user exists
        const user = await User
            .findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid Credentials" });
        }

        //comapre password
        const isMatch = await bcypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid Credentials" });
        }
        //generate jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({ message: "Login successfully", token });
    } catch (error) {
        console.log("Error to login user", error);
        res.status(500).json({ message: "Server Error" });
    }

};



// Function to get a single user by ID
const singleUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

// Exporting the functions
module.exports = { signupUser, loginUser, allUsers, singleUserById };
