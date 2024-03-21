

const otpGenerator = require('otp-generator')

exports.otpGenerator =async()=>{
  try{
    const otp= await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
   
    return otp
  }catch(err){
    console.log(err)
  }
}