const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport'); //this can be simplified to the shown "require" statement because passport does not return anything

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //Heroku dynamic port binding - the caps in "PORT" are required
app.listen(PORT);
