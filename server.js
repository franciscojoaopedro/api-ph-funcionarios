const express = require('express');
const routes = require('./src/routes');
const conectarMongoDB = require('./src/config/database');


const app = express();
const fs=require("node:fs")



require('dotenv').config();
conectarMongoDB()
app.use(express.json({limit:"10mb"}));
app.use("/api",routes);
app.get("/",(req,res)=>{
  res.json({hello:"api rodando..."})
})

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING")
})