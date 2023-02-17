import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    price: {
        type:String,
        required:true,
    },
    category:{
        name: {
            type: String,
            required:true,
        },
        categoryColors:{
            type:Array,
        }

    },
    productImage:{
        type:String,
        required:true
    },

});

export default mongoose.model('ProductModel', ProductSchema)