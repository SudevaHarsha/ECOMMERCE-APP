import express from 'express';
import {registerController, loginController, testController,forgetPasswordController, updateProfileController} from "../controllers/authController.js";
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.post('/forgot-password',forgetPasswordController);

router.get('/test',requireSignin,isAdmin,testController);

router.get('/user-auth', requireSignin, (req,res)=>{
    res.status(200).send({ok: true});
})

router.get('/admin-auth', requireSignin,isAdmin, (req,res)=>{
    res.status(200).send({ok: true});
})

router.put('/profile', requireSignin,updateProfileController);
export default router;