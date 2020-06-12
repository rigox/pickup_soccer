const mongoose =  require('mongoose')
const bcrypt =  require("bcryptjs")
const jwt =   require("jsonwebtoken")
const Schema =  mongoose.Schema

const userSchema =  new Schema({
      name:{
           type:String,
           required:[true,'name is required']
      },
      email:{
          type:String,
          required:[true,'email is required'],
          unique:true,
          match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
        },
        password:{
            type:String,
            required:[true,'password is required'],
            maxlength:[6,'password must be at 6 characthers long'],
            select:false
        },
        resetPasswordToke:String,
      resetPasswordExpire:Date,
      createdAt:{
           type:Date,
           default:Date.now()
      }
})


//encrypt the users password
userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        next();
   }
   const salt =  await  bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password ,  salt);
});


//sign jwt and get the signed token
userSchema.methods.getSignedJwtToken =  function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
   })
}

//match the user passwords
userSchema.methods.matchPassword =  async function(enterPass){
      const isMatch =  await bcrypt.compare(enterPass,this.password)
}

module.exports =  mongoose.model('users',userSchema)