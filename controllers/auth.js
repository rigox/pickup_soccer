const  User = require("../models/User")
const asyncHandler =  require("../middleware/asyncs")
const errorResponse=   require('../utils/errorResponse')

//@Desc create a new user
//@Route POST  api/v1/auth/register
//@Access Public
exports.register =  asyncHandler(async (req,res,next)=>{
      const {name,email , password}  =  req.body;

     const user =  await  User.create({
            name,
            email,
            password
       });

       sendTokenResponse(user,200,res);
});










//sends  a response with signed cookies or a token
function sendTokenResponse(user, statusCode, res){
      const token =  user.getSignedJwtToken()

      const options = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
          httpOnly:true 


      }
      
      if(process.env.NODE_ENV){
           options.secure =  true
      }

      res.status(statusCode).cookie('token',token,options).json({succes:true,token})

}