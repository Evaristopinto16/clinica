//carregando os modulos 
const express = require("express");
const exhbrs = require("express-handlebars");
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const app = express();
const bodyParser = require("body-parser")
require("./model/paciente");
const Paciente= mongoose.model("paciente")
const Admin = require("./router/admin")
const router = require("./router/router")
require("./model/categoria")
const Categoria = mongoose.model("categorias")
const Usuario = require("./router/usuarios")
const passport = require("passport")
require("./config/auth")(passport)

//carregando o nosso tamplete
app.engine('handlebars', exhbrs.engine({defaultLayout: "main"}))
//configurando o nosso template
app.set('view engine', 'handlebars')

app.use(session({
    secret: "clinicaOniline",
    resave: true,
    saveUninitialized: true
    
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    
    next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//conectando a base de dados
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://evaristopinto63:vE4XmWTKwPXnwvLE@clinica.yn2slqv.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Conecta ao Banco de Dados ")
}).catch((err)=>{
    console.log(`Falha no Banco de Dados ${err}`)
})

 

//dando acesso no bootstrap 
app.use(express.static(__dirname, + 'public'))

///routas
app.use(Usuario)
app.use(router)
app.get("/", (req, res)=>{
    res.render("pagina/home")
})
app.use("/admin", Admin)
app.get("/consulta", (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render("pagina/consulta", {categorias: categorias})
    })
   
})

//Avaliar sintomas com a inteligencia artificial
app.get("/chekup", (req, res)=>{
    res.render("pagina/chekup")
})

//Mapas
app.get("/mapa",(req, res)=>{
    res.render("pagina/mapa")
})

app.post("/formulario", (req, res)=>{
    const formulario = {
        nome: req.body.nome,
        idade: req.body.idade,
        contacto: req.body.contacto,
        sintoma: req.body.sintoma,
        dia: req.body.dia,
        hora: req.body.hora,
        categoria: req.body.categoria
    }
    new Paciente(formulario).save().then(()=>{
        var dias = formulario.dia;
        var dia = dias[8]+ ""+ dias[9] + "-" +dias[5]+ "" +dias[6]
        var hora = formulario.hora
        req.flash("success_msg", `Consulta agendada com sucesso no dia ${dia} às ${hora}, você irá receber o link do atendimento via SMS ou E-mail.  Acesse o Link para a consulta ser Iniciada.`)
        res.redirect("/")
    }).catch((err)=>{
        console.log(`erro ao salvar os dados ${err}`)
    })
})


const PORT = process.env.PORT || 2001;
app.listen(PORT, ()=>{
    console.log("Servidor Rodando")
})
