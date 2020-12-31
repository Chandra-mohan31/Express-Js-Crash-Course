
const express = require('express');
const path = require('path');
const members=require("./Members");
const exphbs = require('express-handlebars');
const moment = require('moment');
const logger = require('./middleware/logger');
const app = express();



//handlebars middleware
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');


{/*
//init middleware
app.use(logger);  */}


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);
app.use(express.static(path.join(__dirname,'public')));

//app.get('/',(req,res)=> res.render(index));
//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members',require('./routes/api/members'));

const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server started on PORT",PORT);
});

//middleware func have access to req,res.