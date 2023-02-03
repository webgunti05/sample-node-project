import jwtToken from 'jsonwebtoken';
import {GET_USER_RESPONSE} from '../constants/globalConstants.js';
export const verifyUserLoggedIn = async(req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(400).json({message: GET_USER_RESPONSE.ACCESS_DENIED});
    } else {
        try{
            token = token.split(' ')[1];
            if(token === null || !token){
                return res.status(400).json({message: GET_USER_RESPONSE.UN_AUTH});
            } else{
                let verifiedUser = jwtToken.verify(token, process.env.API_SECRET);
                if(!verifiedUser){
                    return res.status(400).json({message: GET_USER_RESPONSE.UN_AUTH})
                } else{
                    req.user = verifiedUser;
                    next();
                }
            }

        } catch(err){
            return res.status(500).json({err:err, message : GET_USER_RESPONSE.SERVER_ERROR})
        }
    }
}