const express=require('express');
let session = require('express-session');
var bodyParser = require('body-parser')

const app=express();

let sessionOptions = {
  secret: "my-store-cookie",
  saveUninitialized: false,
  resave:false
};

app.use(session(sessionOptions));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

const routes = require('./routes/my_routes');

app.set('view engine','ejs');


app.use(routes);


app.listen(3000,()=>
{
    console.log("server started on port 3000!");
})