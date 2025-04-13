import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}}`)
        console.log(connectionInstance.connection.host)
        
    } catch (error) {
        console.log(`DB connection error ${error.name}:${error.message}`)
        console.log(`Error Stack : ${error.stack}`)
    }
}



export default connectDB;