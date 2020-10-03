const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();

//middleware
app.use(bodyParser.json()); //this is outdated but still seems to work 
//app.use(express.json()); //app.use(express.urlencoded()); //these are supposed to replace bodyparser but are not needed
app.use(cors());

//access backend
const planets = require('./routes/api/planets');
const users = require('./routes/api/users');

app.use('/api/planets', planets);
app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));