const express =  require("express")
const  Router =  express.Router()
const  {createField , getFeilds}  =  require("../controllers/Field")


Router
    .route('/')
        .post(createField)
        .get(getFeilds)


module.exports =  Router;