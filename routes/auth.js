const express =  require("express")
const Router =  express.Router()
const  {register, login ,logout}  = require("../controllers/auth")

Router
    .route('/register')
        .post(register)

Router
    .route('/login')
        .post(login)


Router
    .route('/logout')
        .get(logout)

module.exports  =  Router