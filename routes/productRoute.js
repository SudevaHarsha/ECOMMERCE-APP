import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createMoreImagesController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router();
router.post('/create-product',formidable(),createProductController)
router.post('/create-morephotos/:pid',formidable(),createMoreImagesController)

router.get('/get-product', getProductController)
router.get('/get-product/:slug', getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/product/:pid', deleteProductController)
router.put('/update-product/:pid',formidable(),updateProductController)

router.post('/product-filters',productFiltersController)
router.get('/product-count',productCountController)
router.get('/product-list/:page',productListController)
router.get('/search/:keyword',searchProductController)
router.get('/related-product/:pid/:cid',relatedProductController)
router.get('/product-category/:slug',productCategoryController)

router.get("/braintree/token",braintreeTokenController)
router.post("/braintree/payment",brainTreePaymentController)

export default router;