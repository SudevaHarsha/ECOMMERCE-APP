import express, { Router } from 'express';
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router=express.Router()

router.post('/create-category',requireSignin,isAdmin,createCategoryController);

router.put("/update-category/:id", requireSignin, isAdmin, updateCategoryController);

router.get('/get-category', categoryController);

router.get('/single-category/:slug', singleCategoryController);

router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController);

export default router;