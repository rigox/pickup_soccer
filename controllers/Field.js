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
