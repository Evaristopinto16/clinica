const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const Produtos = new Schema({
    nome: {
        type: String,
        require: true
    },
    preco: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        require: true
    }
    
})



mongoose.model("produtos", Produtos)
 

