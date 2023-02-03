import UserModel from '../models/userModel.js';
import { hashedPassword, comparePassword } from '../utils/globalUtils.js';
import jwtToken from 'jsonwebtoken';
import {GET_USER_RESPONSE} from '../constants/globalConstants.js';


//To Get the Users
export const getUsers = async(req, res) => {
    try{
        const userData = await UserModel.find();
        if(!userData) throw Error(GET_USER_RESPONSE.NO_DATA);
        res.status(200).json({data:userData, message: GET_USER_RESPONSE.FETCH_USERS})
    } catch(err){
        res.status(500).json({message: err})
    }
}


//To Create Users
export const createUser = async(req, res) => {
    const { name, email, phone, password} = req.body;
    try{
        const checkUserExists = await UserModel.findOne({email:email});
        if(!checkUserExists){
            const userData = new UserModel({
                name:name,
                email:email,
                phone:phone,
                password: await hashedPassword(password)
            });
            const savedUser =  await userData.save();
            res.status(200).json({usersList:savedUser, message: GET_USER_RESPONSE.SAVE_USER})
        } else{
            res.status(201).json({message:GET_USER_RESPONSE.USER_EXIST});
        }
    } catch(err){
        res.status(500).json({message:GET_USER_RESPONSE.SERVER_ERROR});
    }

}

//Get User By Id
export const getUserById = async(req, res) => {
    try{
        const findUserById = await UserModel.findById({_id:req.params.id});
        if(findUserById){
            res.status(200).json({data:findUserById, message: GET_USER_RESPONSE.USER_DETAILS_FETCH});
        } else{
            res.status(400).json({message: GET_USER_RESPONSE.USER_NOT_FOUND});
        }
    } catch(err){
        res.status(500).json({message: GET_USER_RESPONSE.SERVER_ERROR});
    }
}

//Update user
export const updateUser = async(req, res) => {
    try{
        const updateUser = await UserModel.findByIdAndUpdate({_id:req.params.id}, {$set:req.body});
        if(updateUser){
            res.status(200).json({message: GET_USER_RESPONSE.USER_UPDATE})
        } else{
            res.status(400).json({message: GET_USER_RESPONSE.ERROR_UPDATING_USER})
        }

    } catch(err){
        res.status(500).json({message: GET_USER_RESPONSE.SERVER_ERROR})
    }
}

//delete user
export const deleteUserById = async(req, res) => {
    try{

        const findUserById = await UserModel.findByIdAndDelete({_id:req.params.id});
        console.log(findUserById)
        if(findUserById){
            res.status(200).json({data:findUserById, message:GET_USER_RESPONSE.USER_DELETE})
        } else{
            res.status(400).json({data:findUserById, message:GET_USER_RESPONSE.USER_NOT_EXIST})
        }


    } catch(err){
        res.status(500).json({err:err, message: GET_USER_RESPONSE.SERVER_ERROR})
    }
}
//Login User
export const loginUser = async(req, res) => {
    try{
        const findUser = await UserModel.findOne({email:req.body.email});
        if(findUser){
            let passwordIsValid = await comparePassword(req.body.password, findUser.password);
            if(!passwordIsValid){
                res.status(401).json({accessToken:null, message:GET_USER_RESPONSE.INVALID_PASSWORD})
            } else{
                let token = jwtToken.sign({
                    id:findUser.id,
                },process.env.API_SECRET, {
                    expiresIn: 86400
                });
                res.status(200).json({loggedUser: findUser, message: GET_USER_RESPONSE.LOGIN_USER, accessToken: token})
            }

        } else{
            res.status(400).json({message: GET_USER_RESPONSE.INVALID_EMAIL})
        }


    } catch(err){
        res.status(500).json({err:err, message: GET_USER_RESPONSE.SERVER_ERROR});
    }
}

