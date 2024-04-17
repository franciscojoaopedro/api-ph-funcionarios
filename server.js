const express = require('express');
const routes = require('./src/routes');
const conectarMongoDB = require('./src/config/database');


const app = express();


require('dotenv').config();
conectarMongoDB()
app.use(express.json({limit:"10mb"}));
app.use(routes);

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING")
})