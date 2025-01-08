// Modelo é um objeto que representa uma coleção no banco de dados

import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    titulo: {
        type: String, 
        required: [true, "O título é obrigatório"]
    },
    editora: {
        type: String,
        required: [true, "A editora é obrigatória"],
        enum: {
            values: ["Classicos"],
            message: "A editora fornecida '{VALUE}' não é permitida."
        }
    },
    preco: {
        type: Number,
        required: [true, "O preço é obrigatório"]
    },
    paginas: {
    type: Number,
    validate:
    {
    validator: (valor) => {
        return valor >= 10 && valor <= 5000;
    },
    message: "O número de páginas deve estar entre 10 e 5000."
    }
    },
    autor: autorSchema
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;