import Social from "../models/social.model.js";
import asyncHandler from "express-async-handler";




const getSocial=asyncHandler(async(req,res)=>{
    const platform=await Social.find()
    if(platform){
        return res.status(200).json({platform:platform})
    }
    else{
        res.status(500)
        throw new Error("Internal Server Error")
    }
})


export { getSocial }