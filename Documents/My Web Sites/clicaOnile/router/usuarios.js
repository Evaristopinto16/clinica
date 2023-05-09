const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
require("../model/usuario")
const Usuario = mongoose.model("usuario")
const upload = require("./../config/configmulter");
 const bcrypt = require("bcryptjs")
 const passport = require("passport")


//routa de cadastro de usuario/especialisata
router.get("/cadastro", (req,res)=>{
    res.render("usuarios/cadastro")

})

//routa de salvar cadastro / especialista no db 
router.post("/usuario",upload.single('carteira'), (req, res)=>{  

        var erros = []
    if(!req.body.nome || req.body.nome == null || req.body.nome == undefined){
        erros.push({text: "Digite nome completo"})
    }
    if(!req.body.bi || req.body.bi == null || req.body.bi==undefined){
        erros.push({text: "Digite número de bilhete"})
    }
     
    if(!req.body.email || req.body.email == null || req.body.email==undefined){
        erros.push({text: "Digite o E-mail"})
    }
    if(req.body.senha.length < 4){
        erros.push({text: "A Senha tem no minímo 6 digito"})
    }
    if(req.body.senha2 != req.body.senha){
        erros.push({text: "Senhas diferentes"})
    }
     
    if(erros.length > 0){
        res.render("usuarios/cadastro", {erros: erros})
    }
    
    else{ 
         Usuario.findOne({bi: req.body.bi}).then((usuario)=>{
                
                if(usuario){
                    req.flash("error_msg", "Já existe uma conta com este E-mail");
                    res.redirect("/cadastro")

                }else{
                    const usuario = new Usuario({ 
                        nome: req.body.nome,
                        bi: req.body.bi,
                        especialidade: req.body.especialidade,
                        valor: req.body.valor,
                        email: req.body.email,
                        senha: req.body.senha, 
                        carteira: req.file.filename
                
                    })
                    bcrypt.genSalt(10, (erro, salt)=>{
                        bcrypt.hash(usuario.senha, salt, (erro, hash)=>{
                            if(erro){
                                req.flash('error_msg', "Houve um erro no salvamento do usuário")
                                res.redirect("/")
                            }
                            usuario.senha = hash;
                            usuario.save().then(()=>{
                        req.flash("success_msg", "Conta criada com sucesso")
                        res.redirect("/login")
                    }).catch((err)=>{
                        console.log("Erro ao salvar no "+err)
                    })
                        })
                    })
                    
                    
                    
                }

         })
       
    }
    
}

)
 
//router de login do usuario 
router.get("/login", (req, res)=>{
    res.render("usuarios/login")
})

//routa de salvar usuario da database;

router.post("/login", (req, res, next)=>{
     passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true

     })(req, res, next)
})

router.get("/logout",(req, res)=>{
    req.logOut(()=>{
        req.flash("success_msg", "Deslogado com sucesso")
        res.redirect("/")
    })
    
})





module.exports = router