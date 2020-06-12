const express =  require("express")
const Router =  express.Router()
const  {register}  = require("../controllers/auth")

Router
    .route('/register')
        .post(register)


        
module.exports  =  Router