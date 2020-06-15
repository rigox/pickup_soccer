const mongoose =  require("mongoose");
const geocoder =  require("../utils/geocoder")
const Schema =  mongoose.Schema

const fieldSchema = new Schema({
   name:{
        type:String,
        required:[true,'name is required']
   },
   maxSize:{
        type:Number,
        required:[true,'please add number of max players']
   },
   website:{
   type:String,
   match: [
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    'Please use a valid URL with HTTP or HTTPS'
  ]
   },
   phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  price:{
       type:Number
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  games:{
    type:Schema.ObjectId,
    ref:'games',
 }
});

//add json point
//Geocode  & and create location field
fieldSchema.pre('save',async function(next){
  const loc =  await geocoder.geocode(this.address);
  this.location = {
       type: 'Point',
       coordinates:[loc[0].longitude,loc[0].latitude],
       formattedAddress:loc[0].formattedAddress,
       street: loc[0].streetName,
       city: loc[0].city,
       state: loc[0].stateCode,
       zipcode: loc[0].zipcode,
       country: loc[0].countryCode
  }
   //no address
   this.address  =  undefined;

  next();
});



module.exports =  mongoose.model('fields',fieldSchema)