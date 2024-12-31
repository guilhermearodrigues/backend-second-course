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
                res.status(404).send({message: `autor não encontrado`});
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
            await autor.findByIdAndUpdate(id, dados);
            res.status(200).json({message: "Autor atualizado"});
        } catch (e) {
            next(e);
        }   
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor deletado"});
        } catch (e) {
            next(e);
        } 
    }

};

export default AutorController;