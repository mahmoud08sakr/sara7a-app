import express from "express";
import { connection } from "./database/connection.js";
const app = express();
const port = 3000;
app.use(express.json())
 connection()
app.get('/', (req, res) => {



   

    res.json("mahmoud sakr")
    console.log("hellow from get");
})


app.listen(port, () => {
    console.log(`server is running at ${port} `);
})