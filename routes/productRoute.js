import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCountController, productFiltersController, productListController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();
router.post('/create-product',requireSignin,isAdmin,formidable(),createProductController)

router.get('/get-product', getProductController)
router.get('/get-product/:slug', getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/product/:pid', deleteProductController)
router.put('/update-product/:pid',requireSignin,isAdmin,formidable(),updateProductController)

router.post('/product-filters',productFiltersController)
router.get('/product-count',productCountController)
router.get('/product-list/:page',productListController)

export default router;