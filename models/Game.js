const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gameSchema = new Schema({
 
name:{
     type:String,
     required:[true,'name is required']
},

timeScheduled:{
   type:Date,
   required:[true,"please schedule a time"]
},
 
 players:[{type:Schema.ObjectId,ref:'users'}],
 
 averageCost:Number,
 




});



module.exports  = mongoose.model('games',gameSchema)