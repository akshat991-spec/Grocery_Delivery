
import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

// Add Product: /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        if (!images || images.length === 0) {
            return res.json({ success: false, message: "No images uploaded" });
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        await Product.create({ ...productData, image: imagesUrl });

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error.message);
        // Typo corrected: sucess -> success
        res.json({ success: false, message: error.message }); 
    }
};

// Get Product List (with optional category filter): /api/product/list?category=drinks
export const productList = async (req, res) => {
    try {
        const filter = {};
        // CHANGE: Check for a category in the query parameters
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const products = await Product.find(filter);
        res.json({ success: true, products });

    } catch (error) {
        console.log(error.message);
        // Typo corrected: sucess -> success
        res.json({ success: false, message: error.message }); 
    }
};

// Get a single Product by its ID: /api/product/:id
export const productById = async (req, res) => {
    try {
        // CHANGE: Get id from req.params, not req.body
        const { id } = req.params; 
        
        // CHANGE: Pass the id to findById
        const product = await Product.findById(id); 

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        res.json({ success: true, product });

    } catch (error) {
        console.log(error.message);
        // Typo corrected: sucess -> success
        res.json({ success: false, message: error.message }); 
    }
};

// Change Product Stock: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });

        res.json({ success: true, message: "Stock Updated" });

    } catch (error) {
        console.log(error.message);
        // Typo corrected: sucess -> success
        res.json({ success: false, message: error.message }); 
    }
};