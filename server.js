let express = require('express')
let app = express();
const path = require('path');
require('dotenv').config()
app.use(express.json())

const myRouter=require('./routes/crud')
app.use('/api',myRouter)

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);


app.listen(3000, () => console.log("Running Node on port " + 3000));


