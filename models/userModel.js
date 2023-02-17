//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    profileImage:{
        type:String
    },
    gender: {
        type:String
    }
});

//module.exports = mongoose.model('UserModel', UserSchema);
export default mongoose.model('UserModel', UserSchema)