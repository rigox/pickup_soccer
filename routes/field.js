const express =  require("express")
const  Router =  express.Router()
const  {createField}  =  require("../controllers/Field")


Router
    .route('/')
        .post(createField)


module.exports =  Router;