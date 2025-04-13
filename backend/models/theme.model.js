import mongoose from "mongoose";



const themeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    bgColor:{
        type:String,
        required:true,
    },
    buttonColor:{
        type:String,
        required:true
    },
    textColor:{
        type:String,
        required:true
    },
    profileTextColor:{
        type:String,
        required:true,
    },
    bgImage:{
        type:String,
        default:null,
    },
    borderColor:{
        type:String,
        default:null
    }
})



const Theme=mongoose.model("Theme",themeSchema)


export default Theme