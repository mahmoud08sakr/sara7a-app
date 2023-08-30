import express from "express";
import { userModel } from "../../../../database/model/userModel/userModel.js";

import bcrypt from "bcrypt"
import { signIn ,signUp, verify } from "./user.controller.js";

const userRoute = express.Router();

userRoute.post('/signUp', signUp);


userRoute.post('/signIn', signIn);


userRoute.get('/verify/:token', verify);







export default userRoute 