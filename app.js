const express = require('express')
const bodyParser = require('body-parser')
const app = express()//what is app
const routes = require('./routes/routes')
const mongoose = require('mongoose')
// route is url the http request is made to
app.use(bodyParser.json())
mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test')
{
mongoose.connect('mongodb://localhost/muber');
}

routes(app);

app.use((err,req,res,next)=>{
  res.status(422).send({error:err.message});
})

module.exports = app;
//*********************************************************
// run by pressing "node index.js"
//********************************************************
