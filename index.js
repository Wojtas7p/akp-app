const express = require('express');
const cors = require('cors'); // Dodaj import modułu cors

const app = express();
const {port} = require('./config')
const apiRouter = require('./routes/api');

// Dodaj obsługę CORS
app.use(cors());

// Dodaj obsługę parsowania JSON
app.use(express.json());

//db
require('./db/mongoose')

// import note.js to ensure the note is saved
require('./db/models/note');

// //router
app.use('/', apiRouter);

//server
app.listen(port, function(){
    console.log('serwer słucha... http://localhost:' + port);
});




