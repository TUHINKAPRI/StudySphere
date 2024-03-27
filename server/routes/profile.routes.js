const express=require('express');
const { updateProfile, deletedAccount, updateProfilePicture, getProfileDetails, instuctorDashboard } = require('../controllers/profile.controllers');
const { auth, isInstructor } = require('../middlewares/auth');
const profileRouter=express.Router();






profileRouter.put('/update-profile',auth,updateProfile)
profileRouter.delete('/delete-account',auth,deletedAccount)
profileRouter.put('/update-profile-picture',auth,updateProfilePicture)
profileRouter.get('/get-profile-details',auth,getProfileDetails)
profileRouter.get('/instructorDashboard',auth,isInstructor,instuctorDashboard)


module.exports=profileRouter;