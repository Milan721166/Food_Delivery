const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Corrected the path to the User model
const dotenv = require("dotenv");

const {
    signupUser,
    loginUser,
    allUsers,
    singleUserById,
} = require("../controllers/userController.js");

dotenv.config();

const router = express.Router();

//GET REQUESTS

// Route to get all users
router.get("/", allUsers);

// Route to get a single user by ID
router.get("/:id", singleUserById);

//POST METHODS

// Signup Route
router.post("/signup", signupUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;