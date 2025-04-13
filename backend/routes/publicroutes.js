import express from "express"
import { getPublicBioLink } from "../controller/userSocial.controller.js"




const publicRouter=express.Router()


publicRouter.get('/:username',getPublicBioLink)


export default publicRouter