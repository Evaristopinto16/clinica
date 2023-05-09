//carregando os modulos 
const exhbrs = require('express-handlebars')
const express = require('express')
const app = express();
const path = require("path")
const mongoose = require('mongoose')
const registro = require('./router/registro')
const bodyParser = require('body-parser');




app.engine('handlebars', exhbrs.engine({defaultLayout: 'main'}))
 
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//conetando se ao banco de dados
mongoose.Promise= global.Promise
mongoose.connect("mongodb://127.0.0.1:27017/loja").then(()=>{
    console.log("conectado ao banco de dados");
})


app.use(express.static(__dirname, +'public'))


app.use('/admin', registro)

app.get('/',(req,res)=>{
    res.send('ola mundo')
})










const PORT  = 600
app.listen(PORT, (req, res)=>{
    console.log("servidor rondando na porta", PORT)
})