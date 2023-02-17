import express from 'express';
const router = express.Router();
import {  getAllProducts, createProduct, getProductById } from '../controllers/productController.js';

router.get('/get-products', getAllProducts);
router.post('/create-product', createProduct);
router.get('/product-details/:id', getProductById)

export default router;