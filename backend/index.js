const express=require("express");
const { contentRouter } = require("./Route/contentConvertor");
const cors=require("cors")
require('dotenv').config()

const app=express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors())
app.use("/",contentRouter)


app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})
