import jwt from "jsonwebtoken"


const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"1h"})
    res.cookie(
        'jwt',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:"lax",
            maxAge:60*60*1000,
            path:'/',
        }
    )
}



export default generateToken;