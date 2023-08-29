import express from "express";
import { userModel } from "../../../../database/model/userModel/userModel.js";

import bcrypt from "bcrypt"
import { signIn ,signUp } from "./user.controller.js";

const userRoute = express.Router();

userRoute.post('/signUp', signUp);


userRoute.post('/signIn', signIn);







export default userRoute 