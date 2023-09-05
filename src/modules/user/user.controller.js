import dotenv from 'dotenv'
dotenv.config = ({})
import { sendEmail } from '../../email/sendEmail.js';

import { userModel } from "../../../database/model/userModel/userModel.js";
import bcrypt from "bcrypt"; // Add this line to import the bcrypt library
import jwt from "jsonwebtoken";












function handelasynkError(fn) {

    return (req, res ,next ) => {
        fn(req, res).catch(err => res.json({ message: "hellow from handel error", err }));
    }

}



export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            if (user.verified) {
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
                res.status(401).json({ message: "plese verify first." });

            }

        } else {
            res.status(404).json({ message: "User does not exist." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred." });
    }
};
export const signUp = handelasynkError( async (req, res) => {
    let { name, email, password } = req.body;
        let existUser = await userModel.findOne({ email });
        if (existUser) {
            res.json("user already exists");
        } else {
            let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));

            let data = await userModel.insertMany({ name, email, password: hashedPassword });

            let verifyedToken = jwt.sign({ id: data[0]._id }, "hoba"); // Use data[0]._id

            sendEmail({ email, api: `http://localhost:3000/api/vi/user/verify/${verifyedToken}` });

            res.json({ message: "user added " });
        }
        res.json({ error: "err", err });
    
})
export const verify = async (req, res) => {
    let { token } = req.params;

    try {
        const decoded = jwt.verify(token, "hoba");

        const updatedData = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true });

        res.json({ message: "Data updated", updatedData });
    } catch (err) {
        res.json({ error: "invalid token", err });
    }
};
