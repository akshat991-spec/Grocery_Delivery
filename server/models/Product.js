import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: Array, required: true},
    price: {type: Number, required: true},
    offerPrice: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    inStock: {type: Boolean, default: true},
},{ timestamps: true}) //we will be able to create a user with empty object data

const Product = mongoose.models.product || mongoose.model('Product', productSchema)

export default Product