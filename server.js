const express = require('express');
const routes = require('./src/routes');
const db = require('./src/config/database');
const app = express();
const fs=require("node:fs")



require('dotenv').config();
app.use(express.json({limit:"10mb"}));
app.use(routes);
app.get("/",(req,res)=>{
  res.json({hello:"api rodando..."})
})

const PORT=process.env.PORT || 7777
db.once('open', function() {
  app.listen(PORT, () => {
    console.log('Servidor rodando na porta 3000 e conectado ao MongoDB');
  });
});