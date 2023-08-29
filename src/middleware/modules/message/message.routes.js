import express from "express"
import { Router } from 'express';
import { messageModel } from "../../../../database/model/messageModel/messageModdel.js";
import { userModel } from "../../../../database/model/userModel/userModel.js";
import jwt from "jsonwebtoken"




const messageRoute = new Router();


messageRoute.post('/', async (req, res) => {
    let { message, recivedId } = req.body;

    try {
        const existingRecipient = await userModel.findById(recivedId);

        if (existingRecipient) {
            let addedMessage = await messageModel.insertMany({ recivedId, message });
            res.json({ message: "Message added successfully", addedMessage });
        } else {
            res.status(400).json({ message: "Invalid recivedId" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
    }
});



messageRoute.get('/getAllMessages', async (req, res) => {
    let token = req.header("token");
    jwt.verify(token, 'sakr', async (err, decoded) => {
        if (err) {
            res.json({ message: "You need to log in first", err });
        } else {
            try {
                let allMessages = await messageModel.find({ recivedId: decoded.id });
                    res.json({ message: "All Messages", allMessages });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "An error occurred." });
            }
        }
    });
});

export default messageRoute;
