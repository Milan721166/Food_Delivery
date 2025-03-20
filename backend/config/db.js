const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables");
        }

        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, // Keep this for backward compatibility
        });
        console.log(`Mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Mongodb Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;