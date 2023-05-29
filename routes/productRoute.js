import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();
router.post('/create-product',requireSignin,isAdmin,formidable(),createProductController)

export default router;