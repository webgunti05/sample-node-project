import jwtToken from 'jsonwebtoken';
export const verifyUserLoggedIn = async(req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(400).json({message: "Access Denied"});
    } else {
        try{
            token = token.split(' ')[1];
            if(token === null || !token){
                return res.status(400).json({message: 'Un authorized'});
            } else{
                let verifiedUser = jwtToken.verify(token, process.env.API_SECRET);
                if(!verifiedUser){
                    return res.status(400).json({message: "Un authorized"})
                } else{
                    req.user = verifiedUser;
                    next();
                }
            }

        } catch(err){
            return res.status(500).json({err:err, message : "Something went wrong"})
        }
    }
}