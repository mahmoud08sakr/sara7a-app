import { Router } from 'express';

import { auth } from "../../middleware/auth.js";
import { addMessage, getAllMessages } from './message.controlle.js';




const messageRoute = new Router();


messageRoute.post('/', addMessage);


messageRoute.get('/getAllMessages', auth, getAllMessages);


export default messageRoute;
