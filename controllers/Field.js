const Field =  require("../models/Field")
const AsyncHandler =  require("../middleware/asyncs")
const ErrorResponse =  require("../utils/errorResponse")

//@Desc  creates a new field
//@Route POST  api/v1/field
//Access private
exports.createField =   AsyncHandler(async(req,res,next)=>{

      const field = await Field.create(req.body)
      
      res.status(200).json({
           success:true,
           data:field
      })
      
});


//@Desc  gets all fiels
//@Route POST  api/v1/field/
//Access private
exports.getFeilds  =  AsyncHandler(async (req,res,next)=>{
       const  fields =  await  Field.find({})

       res.status(200).json({
            success:true,
            length:  fields.length,
            data: fields
       })
});


//@Desc  cancel reservation a field
//@Route POST  api/v1/field/cancel
//Access private
exports.cancelReservation =  AsyncHandler(async(req,res,next)=>{
   const field =   await Field.findOne({})
  
 if(!field){
       return res.status(400).json({msg:'resource was not found'})
 }

  res.json({})

});

//@Desc  reserves a field
//@Route POST  api/v1/field/reserver
//Access private
exports.reserve =  AsyncHandler(async(req,res,next)=>{
    const field =   await Field.findOne({})

});

