import {autor} from "../models/Autor.js";

class AutorController {
    static async listarAutores (req, res) {
        try {
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);
        } catch (e) {
            res.status(500).json({message: `${e} - falha ao listar autores`});
        }    
    }
    
    static async listarAutorPorId (req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (e) {
            res.status(500).json({message: `${e} - falha ao listar autor`});
        }    
    }

    static async cadastrarAutor (req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "Criado com sucesso", autor: novoAutor});
        } catch (e) {
            res.status(500).json({message: `${e.message} - falha ao cadastrar autor`});
        }
    }

    static async atualizarAutor (req, res) {
        try {
            const id = req.params.id;
            const dados = req.body;
            await autor.findByIdAndUpdate(id, dados);
            res.status(200).json({message: "Autor atualizado"});
        } catch (e) {
            res.status(500).json({message: `${e} - falha ao atualizar autor`});
        }   
    }

    static async deletarAutor (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor deletado"});
        } catch (e) {
            res.status(500).json({message: `${e} - falha ao deletar autor`});
        } 
    }

};

export default AutorController;