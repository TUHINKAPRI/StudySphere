const express=require('express');
const { updateProfile, deletedAccount, updateProfilePicture, getProfileDetails } = require('../controllers/profile.controllers');
const { auth } = require('../middlewares/auth');
const profileRouter=express.Router();






profileRouter.put('/update-profile',auth,updateProfile)
profileRouter.delete('/delete-account',auth,deletedAccount)
profileRouter.put('/update-profile-picture',auth,updateProfilePicture)
profileRouter.get('/get-profile-details',auth,getProfileDetails)



module.exports=profileRouter;