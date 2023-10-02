import express, { Router } from 'express';
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router=express.Router()

router.post('/create-category',createCategoryController);

router.put("/update-category/:id", updateCategoryController);

router.get('/get-category', categoryController);

router.get('/single-category/:slug', singleCategoryController);

router.delete('/delete-category/:id', deleteCategoryController);

export default router;