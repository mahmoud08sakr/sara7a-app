import dotenv from 'dotenv'
dotenv.config =({})

import { userModel } from "../../../../database/model/userModel/userModel.js";
import bcrypt from "bcrypt"; // Add this line to import the bcrypt library
import jwt from "jsonwebtoken";


export const signIn = async (req, res) => {
    const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });

            if (user) {
                const matched = await bcrypt.compare(password, user.password);
                console.log(process.env.SECRET_KEY);
                if (matched) {



                    //TODO: m4 rad y2ra el security key mn el .env file  


                    
                    const token = jwt.sign({ id: user._id }, "sakr");
                    res.status(200).json({ message: "Authentication successful.", token });
                } else {
                    res.status(401).json({ message: "Authentication failed. Incorrect password." });
                }
            } else {
                res.status(404).json({ message: "User does not exist." });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "An error occurred." });
        }
    };
export const signUp = async (req, res) => {
    let { name, email, password } = req.body
console.log(process.env.SALTROUNDES);
    try {

        let existUser = await userModel.findOne({ email })
        if (existUser) {
            res.json("user already exists")
        } else {

            let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDES))
            let data = await userModel.insertMany({ name, email, password: hashedPassword })
            res.json({ message: "user added " })

        }

    } catch (err) {
        res.json({ error: err })

    }


}


