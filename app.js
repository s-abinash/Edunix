let express = require('express')
let app = express();
const path = require('path');
require('dotenv').config()
app.use(express.json())
const cors = require('cors');
app.use(cors());
app.options('*', cors());

app.use('/api/user',require('./routes/crud'))

app.use('/api/course',require('./handlers/course'))
app.use('/api/content',require('./handlers/content'))
app.use('/api/comment',require('./handlers/comment'))



app.use('/upload',require('./routes/videoUpload'))

app.use('/api/mail',require('./mail'))

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

// Serve Application
app.use(express.static('public'))

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Running Node on port " + 3000));


