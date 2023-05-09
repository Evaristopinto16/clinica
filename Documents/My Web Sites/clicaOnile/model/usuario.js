const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Usuarios = new Schema({
        nome: {
            type: String,
            require: true
        },
        bi: {
            type: String,
            require: true
        },
        especialidade: {
            type: String,
            require: true
        },
        valor: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        eAdmin: {
            type: String,
            default: 0
        },
        senha: {
            type: String,
            require: true
        }, 
        carteira: {
            type: String,
            require: true
        }
        
         
         
    }
)

mongoose.model('usuario', Usuarios)