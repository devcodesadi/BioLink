const notFound=(req,res,next)=>{
    const error=new Error(`Not Found- ${req.originalUrl}`)
    res.status(404)
    next(error)
}


const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500:res.statusCode;
    const message=err.message

    if(err.name==='CastError' && err.kind==='ObjectId'){
        statusCode=404;
        message='Resource Not Found'
    }
    console.log(err)
    console.log(err.message)

    res.status(statusCode).json({message:message,stack:process.env.NODE_ENV='production'?null:err.stack})
}




export { notFound ,errorHandler }