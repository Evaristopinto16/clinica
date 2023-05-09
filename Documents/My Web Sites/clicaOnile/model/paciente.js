const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Paciente = new Schema({
    nome: {
        type: String,
        require: true
    },
    idade: {
        type: String,
        require: true
    },
    contacto: {
        type: String,
        require: true

    },
    sintoma: {
        type: String,
        require: true
    },
    dia: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    }, 
    data:{
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        require: true

    }

     
})


mongoose.model('paciente', Paciente)