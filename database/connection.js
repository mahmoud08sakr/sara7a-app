import mongoose from "mongoose";

export function connection() {
    mongoose
        .connect("mongodb://127.0.0.1:27017/sara7aApp")
        .then(() => {
            console.log("db connection established");
        }
        ).catch((err) => {
            console.log('db connection error');
        })
}