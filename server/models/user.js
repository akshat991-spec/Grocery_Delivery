//store the user data in the database
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartItems: {type: Object, default: {}},
},{minimize: false}) //we will be able to create a user with empty object data

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User
