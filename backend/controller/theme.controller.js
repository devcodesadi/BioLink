import asyncHandler from "express-async-handler";
import Theme from "../models/theme.model.js";



const getTheme=asyncHandler(async(req,res)=>{
    
    const getAllTheme=await Theme.find()
    if(getAllTheme){
        return res.status(200).json(getAllTheme)
    }
    else{
        res.status(404)
        throw new Error(`Theme don't exist! Please select another theme`)
    }
})



export default getTheme;