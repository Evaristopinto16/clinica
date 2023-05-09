const localStrategy = require("passport-local").Strategy
const mongosse = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")


require("./../model/usuario")
const Usuario = mongosse.model("usuario")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'bi', passwordField: 'senha'}, (bi, senha, done)=>{
        Usuario.findOne({bi: bi}).then((usuario)=>{
            if(!usuario){
                return done(null, false, {message: "Não existe uma conta com este número de Bilhete"})
            }
            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha Incorreta"})
                }
            })
        })
    }))
}

passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)

})

passport.deserializeUser((id, done)=>{
    Usuario.findById(id, (err, usuario)=>{
        done(err, usuario)
    })
})