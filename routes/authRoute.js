import express from 'express';
import {registerController, loginController, testController,forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsersController, deleteUserController, getUsersByIdController, usersRoleController, getUserOrdersController} from "../controllers/authController.js";
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.post('/forgot-password',forgetPasswordController);

router.get('/test',testController);

router.get('/user-auth', (req,res)=>{
    res.status(200).send({ok: true});
})

router.get('/admin-auth', (req,res)=>{
    res.status(200).send({ok: true});
})

router.put('/profile',updateProfileController);

router.get("/orders",getOrdersController);
router.get("/user-orders/:uid",getUserOrdersController);
router.get("/all-orders",getAllOrdersController);
router.put("/order-status/:orderId",orderStatusController);

router.get("/all-users",getAllUsersController);
router.delete('/delete-user/:id', deleteUserController);
router.get('/user/:id', getUsersByIdController);
router.put('/user-role/:id', usersRoleController);
export default router;