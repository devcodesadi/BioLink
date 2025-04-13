import asyncHandler from "express-async-handler";
import Social from "../models/social.model.js";
import UserSocial from "../models/userSocial.model.js";
import User from "../models/user.model.js";



//@desc user create bioLink during onboard procedure

const userOnboard = asyncHandler(async (req, res) => {
  const { key, name,userName, about } = req.body;
  const userId = req.userId;
  const findSocial = await Social.findById(key);

  if (findSocial) {
    const newSocial = await UserSocial.create({
      user: userId || null,
      username:userName,
      name: name || "john",
      about: about || null,
      userLinks: [
        {
          icon: findSocial.icon,
          socialName: findSocial.socialName,
          baseUrl: findSocial.baseUrl,
        },
      ],
    });
    const user = await User.findById(userId);
    user.isOnboard = true;
    await user.save();
    res.status(200).json(newSocial, { isOnboard: user.isOnboard });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});






const updateSocial = asyncHandler(async (req, res) => {
  const {socialId, name, about } = req.body;

  const userId=req.userId

  const findUserSocial = await UserSocial.findOne({ user: userId });

  if (findUserSocial) {
    findUserSocial.name = name || findUserSocial.name;
    findUserSocial.about = about || findUserSocial.about;
    if(socialId){
      const findSocial = await Social.findById(socialId);
    if (findSocial) {
      findUserSocial.userLinks.push({
        icon: findSocial.icon,
        socialName: findSocial.socialName,
        baseUrl: findSocial.baseUrl,
      });
    }
    }
    await findUserSocial.save();

    res.status(200).json(findUserSocial);
  } else {
    res.status(404);
    throw new Error("Can't find BioLink");
  }
});




//@desc deleted a social platform from user social list


const removeSocial=asyncHandler(async(req,res)=>{
  const { key }=req.body
  const userId=req.userId

  const isUserBioExist=await UserSocial.findOne({user:userId})

  if(isUserBioExist){
   const index= isUserBioExist.userLinks.findIndex((social)=>social._id.toString()===key)
   if(index!==-1){
     isUserBioExist.userLinks.splice(index,1)
     await isUserBioExist.save()
   }
   return res.status(200).json({success:true,message:`Social link removed`})
  }
  else{
    res.status(404)
    throw new Error(`Social Link not found`)
  }
})




//@desc fetch user social list



const getBioLink = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const userBioLink = await UserSocial.findOne({ user: userId });
  if (userBioLink) {
    return res.status(200).send(userBioLink);
  } else {
    res.status(400);
    throw new Error(`BioLink not found`);
  }
});






//@desc edit user social links



const editLinks=asyncHandler(async(req,res)=>{
  const { socialId ,newSocialName ,newUrl}=req.body

  const userId=req.userId

  const isUserSocialExist=await UserSocial.findOne({user:userId})

  if(isUserSocialExist){
    const socialIndex= isUserSocialExist.userLinks.findIndex((social)=>social._id.toString()===socialId)
    if(socialIndex!==-1){
      // isUserSocialExist.userLinks[socialIndex].socialName=newSocialName || isUserSocialExist.userLinks[socialIndex].socialName
      isUserSocialExist.userLinks[socialIndex].baseUrl=newUrl

      await isUserSocialExist.save()

      res.status(200).json({success:true,message:`Social link updated successfully`})

    }

    else{
      res.status(404)
      throw new Error(`socilaLink not found ! Please Try again after some time or login again`)
    }
  }
  else{
    res.status(401)
    throw new Error(`BioLink not found ! Please Try again after some time or login again`)
  }
})




const getPublicBioLink=asyncHandler(async(req,res)=>{
  const username=req.params.username
  const getUserPublicBioLink=await UserSocial.findOne({username:new RegExp(`^${username}`)})
  if(getUserPublicBioLink){
    const publicBioLinkData={
      name:getUserPublicBioLink.name,
      username:getUserPublicBioLink.username,
      about:getUserPublicBioLink.about,
      socialLink:getUserPublicBioLink.userLinks

    }
    return res.status(200).json(publicBioLinkData)

  }
  else{
    res.status(404)
    throw new Error(`BioLink NotFound ! Please check userName`)
  }
})




export { userOnboard, updateSocial, getBioLink ,removeSocial ,editLinks,getPublicBioLink};
