const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router()
const {eAdmin}= require("../helpers/e-admin")

//chatGPT
const {Configuration, OpenAIApi } = require('openai');
 const cors = require("cors")
require('dotenv').config();
 
 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

router.use(express.json());
router.use(cors())

router.post('/api/chat', async (req, res) => {
  const message = req.body.nome;

  try {
    const response = await openai.createCompletion( {
            model: "text-davinci-003",
            prompt: "ola mudno",
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
    });

    const answer = response.data.choices[0].text
    res.send({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Algo deu errado' });
  }
});

 


//carregando os Models
require("../model/categoria")
const Categoria = mongoose.model("categorias")
require("../model/paciente")
const Paciente = mongoose.model("paciente")
require("../model/pendente")
const Pendente = mongoose.model("pendente")

//pegar id da consulta para analisar
router.get("/consulta/:id", (req, res)=>{
  Paciente.findById({_id: req.params.id}).populate("categoria").lean().then((Paciente)=>{
    res.render("admin/analisar", {paciente: Paciente})
  })
})
//routar para atender eliminar o Paciente

router.post('/pentente', (req, res)=>{
    const pendente = {
      nome: req.body.nome,
      idade: req.body.idade,
      contacto: req.body.contacto,
      sintoma: req.body.sintoma,
      dia: req.body.dia,
      hora: req.body.hora, 
      especialidade: req.body.especialidade
    }
    new Pendente(pendente).save().then(()=>{
      Paciente.remove({_id: req.body.id}).then(()=>{
      res.redirect("/admin/cunsultas")
        
      })
    })


})



router.get("/categoria/add", (req, res)=>{
  res.render("admin/addcategoria")
})
router.get("/cunsultas", (req, res)=>{
    Paciente.find().lean().sort({dia: "asc"}).populate("categoria").then((paciente)=>{
        res.render("admin/consultaadm", {"paciente": paciente})
    })    
    
})


router.get("/categoria/rem/:id", eAdmin, (req, res)=>{
  Categoria.remove({_id: req.params.id}).then(()=>{
      res.redirect("/admin/categoria")

  })

})
router.get("/categoria",(req, res)=>{
  Categoria.find().lean().then((categoria)=>{
     res.render("admin/categorias", {categoria: categoria})
  })

})
router.post("/categoria/save", (req, res)=>{


  const salvarCategoria = {
    nome: req.body.nome
  }
  new Categoria(salvarCategoria).save().then(()=>{
    res.redirect("/admin/categoria")
  }).catch((err)=>{
    console.log("houve um erro na salvar os dados ")
  })

})




module.exports = router