import nodemailer, { createTransport } from "nodemailer"





const sendMail=(toUser,subject,text)=>{
    const transporter=createTransport({
        service:"gmail",
        // port:465,
        // secure:true,
        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD,
            
        },
    
    })
    
    const mailOption={
        from:process.env.USER,
        to:toUser,
        subject:subject,
        html:text
    }

    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(`nodemail error:`,error)
        }
        else{
            console.log(`nodemail info:`,info)
        }
    })
    
    
}



export { sendMail }



