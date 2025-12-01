import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(config.database.mongodb_uri, {
            dbName: config.database.db_name,
        });
        console.log("MongoDB Connected Successfully ✅");
    } catch (error) {
        console.error("MongoDB Connection Error ❌", error.message);
        process.exit(1);
    }
};

export default connectDB;