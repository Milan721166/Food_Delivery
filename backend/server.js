const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Ensure this is loaded at the top

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const insertData = require("./db/data");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json()); // Add this to parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("E-Commerce API is running...");
});

// Fix the base path for product routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Start the server after connecting to DB and inserting data
const startServer = async () => {
    try {
        await connectDB();
        await insertData(); // Ensure this function handles errors internally

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(`Error starting server: ${err.message}`); // Improved error logging
        process.exit(1);
    }
};

startServer();