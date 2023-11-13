import mongoose from 'mongoose';

import { MONGO_DB_URL } from "../secrets/secrets.js";

export function connectMongoDB() {
    mongoose.connect(MONGO_DB_URL);
    mongoose.connection.on("connected", function() {
        console.info('The application was connect to MONGODB Successfully !!! ')
    })
    mongoose.connection.off("Error", function() {
        console.error("The application wasn't connect to MONGODB !!!")
    })
}