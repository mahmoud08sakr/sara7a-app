import { Timestamp } from "bson";
import {Schema , model} from "mongoose";


const userSchema = new Schema ({
    name: {
        type : String,
        required : true,

    },
    email:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true,
        minLength:[4,"password in too short"]

    },
    verified: {

        type:Boolean,
        default:false
    }

},{timestamps:true}
)


export const userModel = model("User" , userSchema)