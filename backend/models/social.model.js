import mongoose from "mongoose";



const socialSchema=new mongoose.Schema(
    {
        icon:{
            type:String,
            required:true,
            unique:true,
        },
        socialName:{
            type:String,
            unique:true,
            required:true
        },
        baseUrl:{
            type:String,
            required:true,
            unique:true,
        }
    }
    ,{timestamps:true})




const Social=mongoose.model("Social",socialSchema)



export default Social;