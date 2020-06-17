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