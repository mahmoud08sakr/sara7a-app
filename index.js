import dotenv from 'dotenv'
dotenv.config =([])
import express from "express";
import { connection } from "./database/connection.js";
import userRoute from "./src/modules/user/user.routes.js";
import messageRoute from './src/modules/message/message.routes.js';
const app = express();
const port = 3000;
app.use(express.json())

app.use("/api/vi/user", userRoute)
app.use("/api/vi/message" , messageRoute)
app.use("*" , (req , res) => {
res.json(`invalid url , ${req.originalUrl}` )

})
connection()



app.listen(port, () => {
    console.log(`server is running at ${port} `);
})