const express = require('express');
const cors = require('cors');

const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');

// Dodaj obsługę CORS
app.use(cors({
    origin: ['https://main--akpdatabase.netlify.app', 'https://akpdatabase.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

// Dodaj obsługę parsowania JSON
app.use(express.json());

// db
require('./db/mongoose');

// import note.js to ensure the note is saved
require('./db/models/note');

// router
app.use('/', apiRouter);

// server
app.listen(port, function () {
    console.log('serwer słucha... http://localhost:' + port);
});
