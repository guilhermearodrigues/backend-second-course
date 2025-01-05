import Erro404 from "../erros/Erro404.js";
import {autor} from "../models/Autor.js";

class AutorController {
    static async listarAutores (req, res, next) {
        try {
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);
        } catch (e) {
            next(e);
        }    
    }
    
    static async listarAutorPorId (req, res, next) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            if (autorEncontrado !== null) {
                res.status(200).json(autorEncontrado);
            } else {
                next(new Erro404("ID do autor não encontrado."));
            }
        } catch (e){
            next(e);
        }    
    }

    static async cadastrarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "Criado com sucesso", autor: novoAutor});
        } catch (e) {
            next(e);
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const dados = req.body;
            const atualizaAutor = await autor.findByIdAndUpdate(id, dados);
            if (atualizaAutor !== null) {
                res.status(200).json({message: "Autor atualizado"});
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }
        } catch (e) {
            next(e);
        }   
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const deletaAutor = await autor.findByIdAndDelete(id);
            if (deletaAutor !== null) {
                res.status(200).json({message: "Autor deletado"});
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }
        } catch (e) {
            next(e);
        } 
    }

};

export default AutorController;