const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/portal_funcionario';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;