const cloudinary = require("cloudinary").v2;


exports.connectToCloudinary = async () => {
  try {
   const configg= cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    // console.log(configg)
    console.log('cloudinary connection is successfully')
  } catch (err) {
    console.log(err);
  }
};
