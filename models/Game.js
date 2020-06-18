const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gameSchema = new Schema({
 
name:{
     type:String,
     required:[true,'name is required']
},

timeScheduled:{
   type:Date,
   required:[true,"please add time game is schedule"]
},
 
 players:[{type:Schema.ObjectId,ref:'users'}],
 
 averageCost:Number,
  
 split:Number



});



module.exports  = mongoose.model('games',gameSchema)