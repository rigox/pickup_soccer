const colors   =  require("colors")
const dotenv =  require("dotenv")
const db  =  require("./config/db")
const express = require("express")
const morgan  =  require("morgan")
const app =  express()

//load envrimonet variables
dotenv.config({path:'./config/config.env'})



//custom middleware
const errorHandler =  require("./middleware/error");


//connect to database
db();
//MIDDLEWARE
app.use(express.json(), express.urlencoded())

if(process.env.NODE_ENV==="development"){
     app.use(morgan())
}


//load routes
const auth =  require('./routes/auth')

//setup routes 
app.get('/',(req,res)=>{res.send('welcome to futbolito')})

app.use('/api/v1/auth',auth)


//setup errohandler middleware
app.use(errorHandler)


const PORT =  process.env.PORT || 5001

const server =  app.listen(PORT ,()=>{
     console.log(`listening on PORT ${PORT}`.yellow)
})

