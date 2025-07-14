// here we will create the configs that will connect our project with data base

import mongoose, { mongo } from "mongoose"

const connectDB = async()=>
{
    try
    {
        mongoose.connection.on('connected', ()=>console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)
    }
    catch(error)
    {
        console.error(error.message);
    }
}


export default connectDB;
