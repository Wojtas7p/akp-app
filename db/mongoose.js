// const mongoose = require('mongoose');
// const {database} = require('../config');

// mongoose.connect(database, {});

const mongoose = require('mongoose');
const { database } = require('../config');

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err));

