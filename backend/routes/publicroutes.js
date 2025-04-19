import express from "express"
import { getPublicBioLink } from "../controller/userSocial.controller.js"




const publicRouter=express.Router()


publicRouter.get('/:clientusername',getPublicBioLink)


console.log(`public router username`,username)


export default publicRouter