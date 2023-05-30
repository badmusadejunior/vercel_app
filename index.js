const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const mon
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))
app.use(express.json({limit:"50mb"}));
const userRoute = require('./routes/user.route')
app.use("/user", userRoute);




app.listen (PORT,()=>{
    console.log(`Port has started on ${PORT}`)
})