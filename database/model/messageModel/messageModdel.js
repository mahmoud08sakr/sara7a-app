
import {Schema , Types, model} from "mongoose";


const messageSchema = new Schema ({
    message: {
        type : String,
        required : true,

    },
    recivedId:{
        type: Types.ObjectId,
        ref:"User"

    }

},{timestamps:true}
)


export const messageModel = model(Message , messageSchema)