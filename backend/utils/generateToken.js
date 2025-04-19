import jwt from "jsonwebtoken"


const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"24h"})
    res.cookie(
        'jwt',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            
        }
    )
}



export default generateToken;