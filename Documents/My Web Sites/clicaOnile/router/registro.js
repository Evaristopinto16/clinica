const express = require('express')
const mongoose = require('mongoose')
const upload = require("../config/configmulter")
const router = express.Router()

//carregando os models
require('../model/produtos')
require('../model/categoria')
const Categoria = mongoose.model('categoria')
const Produtos = mongoose.model('produtos')
//uma rota publica dos usuarios att: nao deveria estar aqui na router dos usuarios 
router.get('/', (req, res)=>{
 Produtos.find().lean().then((produtos)=>{
    res.render('pagina/produtos', {produtos: produtos})
 })
})
//uma router que permite o usuario adicionar produtos 
router.get('/adicionar', (req, res)=>{
    res.render('pagina/adicionar')
})
router.get('/categoria/adicionar', (req, res)=>{
    res.render('pagina/addcategoria')
})

//uma router que permite que lista os produtos no   estock 
 
router.get('/stock',(req, res)=>{
    Produtos.find().lean().then((produtos)=>{
        res.render('pagina/cadastrado', {produtos: produtos})
    })

        
})

router.get('/categoria', (req, res)=>{
    Categoria.find().lean().then((categorias)=>{
        res.render('pagina/categoria', {categorias: categorias})
    })
})
 //routers para cadastrar na base de dados Mongoose
router.post("/cadastrar",upload.single("foto"), (req, res)=>{

    const cadastro = {
        nome: req.body.nome,
        preco: req.body.preco,
        foto: req.file.filename
    }
    new Produtos(cadastro).save().then(()=>{
        console.log('cadastrado com sucesso')
        res.redirect('/admin/stock')
    }).catch((err)=>{
        console.log("erro", err)
    })


})

router.post('/categoria/salvar', (req, res)=>{
    const novaCategoria = {
        nome: req.body.nome
    }
    new Categoria(novaCategoria).save().then(()=>{
      res.redirect('/admin/categoria')
    })
})

//rotas para eliminar produtos por intermedio do ID
 router.post('/stock/deletar', (req, res)=>{
        Produtos.remove({_id: req.body.id}).then(()=>{
            res.redirect('/admin/stock')
        })
    
    
 })
 router.post('/categoria/deletar', (req, res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        res.redirect('/admin/categoria')
    })
 })

 // rotas para editar os produtos
router.post('/cadastrar/edit', (req, res)=>{

    Produtos.findOne({_id: req.body.id}).then((produto)=>{
        produto.nome = req.body.nome
        produto.preco = req.body.preco
        produto.save().then(()=>{
            res.redirect('/admin/stock')
        })
    })
    
        
    
    
})
 router.get('/stock/:id', (req, res)=>{
    Produtos.findOne({_id: req.params.id}).lean().then((produtos)=>{
        res.render('pagina/editarproduto', {produto: produtos})
    })
 })





















module.exports = router

