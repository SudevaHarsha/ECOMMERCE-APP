import express from 'express';
import {registerController, loginController, testController,forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController, deleteUserController, getUsersByIdController} from "../controllers/authController.js";
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

router.get("/orders",requireSignin,getOrdersController);
router.get("/all-orders",requireSignin,isAdmin,getAllOrdersController);
router.put("/order-status/:orderId",requireSignin,isAdmin,orderStatusController);

router.get("/all-users",requireSignin,isAdmin,getAllUsersController);
router.delete('/delete-user/:id', requireSignin, isAdmin, deleteUserController);
router.get('/user/:id', requireSignin, isAdmin, getUsersByIdController);
export default router;