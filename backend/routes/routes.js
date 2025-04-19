import express, { Router } from "express"
import { isEmailVerified, isValid, userLogin, userLogOut, userRegister } from "../controller/auth.controller.js"
import { getSocial } from "../controller/social.controller.js"
import { editLinks, getBioLink, getPublicBioLink, removeSocial, updateSocial, userOnboard, userSocialTheme } from "../controller/userSocial.controller.js"
import authToken from "../middlewares/auth.middleware.js"
import getTheme from "../controller/theme.controller.js"




const router =express.Router()


router.post('/register',userRegister)
router.get('/email-verify',isEmailVerified)
router.post('/login' , userLogin)
router.post('/logout', userLogOut)
router.get('/isvalid', isValid)
router.get('/getsocial', getSocial)
router.post('/onboard',authToken,userOnboard)
router.post('/updatesocial',authToken,updateSocial)
router.get('/getbiolink',authToken,getBioLink)
router.post('/remove',authToken,removeSocial)
router.post('/editlinks',authToken,editLinks)
router.post('/themeupdate',authToken,userSocialTheme)
router.get('/theme',getTheme)



export default router