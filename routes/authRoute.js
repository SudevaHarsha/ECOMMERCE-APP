import express from 'express';
import {registerController, loginController, testController} from "../controllers/authController.js";
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.get('/test',requireSignin,isAdmin,testController);

router.get('/user-auth', requireSignin, (req,res)=>{
    res.status(200).send({ok: true});
})
export default router;