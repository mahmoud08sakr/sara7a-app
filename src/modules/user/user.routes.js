import express from "express";

import { signIn ,signUp, verify } from "./user.controller.js";

const userRoute = express.Router();

userRoute.post('/signUp', signUp);


userRoute.post('/signIn', signIn);


userRoute.get('/verify/:token', verify);







export default userRoute 