import mongoose from "mongoose";



const userSocialSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
        },
        about:{
            type:String,
        },

        userLinks:[{
            icon:{
                type:String,
                required:true,
                
            },
            socialName:{
                type:String,
                required:true
            },
            baseUrl:{
                type:String,
                required:true,

            }
        }
        ],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        theme:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Theme"
        }

    },
    {timestamps:true})


const UserSocial=mongoose.model("UserSocial",userSocialSchema)


export default UserSocial