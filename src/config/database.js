const mongoose = require('mongoose');
require("dotenv").config()
const mongoDB = process.env.MONGO_URL_LOCAL;
const mongoDBcloud=process.env.MONGO_URL_CLOUD;



 async function conectarMongoDB(){

    try {
        // Tenta se conectar ao MongoDB Atlas
        await mongoose.connect(mongoDBcloud);
        console.log({
            cloud: true,
            messageDB: "MONGO CLOUD CONNECTED",
            DATE: `${new Date().toLocaleDateString()}`
        });
    } catch (error) {
        console.log("Falha ao conectar ao MongoDB Atlas, tentando conexão local...");
        try {
            // Se falhar, tenta se conectar ao MongoDB local
            await mongoose.connect(mongoDB);
            console.log({
                local: true,
                messageDB: "MONGO LOCAL CONNECTED",
                DATE: `${new Date().toLocaleDateString()}`
            });
        } catch (localError) {
            // Se a conexão local também falhar, loga o erro
            console.log({
                message: "ERRO AO CONECTAR AO BANCO DB",
                messageError: localError
            });
        }
    }

}


module.exports=conectarMongoDB