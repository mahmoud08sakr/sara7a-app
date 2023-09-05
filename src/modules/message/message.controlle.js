import { messageModel } from "../../../database/model/messageModel/messageModdel.js";
import { userModel } from "../../../database/model/userModel/userModel.js";

export const  addMessage = async (req, res) => {
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
} 


export const getAllMessages = async (req, res) => {
    try {
        let allMessages = await messageModel.find({ recivedId: req.userId });
        res.json({ message: "All Messages", allMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
    }
}