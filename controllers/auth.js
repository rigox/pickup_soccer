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

//@Desc login a  user
//@Route POST  api/v1/auth/login
//@Access Public
exports.login =  asyncHandler(async(req,res,next)=>{
   const  {email, password }  = req.body;

   if(!email || !password){
       return next(new errorResponse('please provide password or  email',401))
   } 

   // check for the user

    const user =  await User.findOne({email:email}).select('+password');
      
   if(!user){
        return next(new errorResponse(`no user with email ${email} was found`,401));
   } 

  //check if the passwords match 

  let isMatch =   await user.matchPassword(password);

  if(!isMatch){
    return next(new errorResponse('Invalid credentials',401));
  }

  sendTokenResponse(user,200,res)

});

//@Desc logouts a user
//@Route /api/v1/auth/logout
//@Private
exports.logout =  asyncHandler(async(req,res,next)=>{
     res.cookie('token','none',{
        expires:new  Date(Date.now() + 10 * 1000),
        httpOnly:true 
     });

     res.status(200).json({succes:true,data:{}})
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