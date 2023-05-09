const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Categoria = new Schema({
    nome: {
        type: String
    }
})

mongoose.model("categorias", Categoria)