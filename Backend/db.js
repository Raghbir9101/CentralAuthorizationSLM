import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connection = mongoose.connect(process.env.MONGODB_CONNECTION_STRING_1 + "webSLM");

export {
    connection,
}