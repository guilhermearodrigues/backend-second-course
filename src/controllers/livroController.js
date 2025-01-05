import livro from "../models/Livro.js";
import {autor} from "../models/Autor.js";
import Erro404 from "../erros/Erro404.js";

class LivroController {
    static async listarLivros (req, res, next) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (e) {
            next(e);
        }    
    }
    
    static async listarLivroPorId (req, res, next) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if (livroEncontrado !== null) {
                res.status(200).json(livroEncontrado);
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }
        } catch (e) {
            next(e);
        }    
    }

    static async cadastrarLivro (req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {
                ...novoLivro, 
                autor: {...autorEncontrado._doc}
            };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({message: "Criado com sucesso", livro: livroCriado});
        } catch (e) {
            next(e);
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const dados = req.body;
            const livroEncontrado = await livro.findByIdAndUpdate(id, dados);
            if (livroEncontrado !== null) {
                res.status(200).json({message: "Livro atualizado"});
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }  
        } catch (e) {
            next(e);
        }   
    }

    static async deletarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroDeletado = await livro.findByIdAndDelete(id);
            if (livroDeletado !== null) {
                res.status(200).json({message: "Livro deletado"});
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }
            
        } catch (e) {
            next(e);
        } 
    }

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({editora: editora});
            if (livrosPorEditora !== null) {
                res.status(200).json(livrosPorEditora);
            } else {
                next(new Erro404(`O ID ${id} não foi encontrado.`));
            }
        } catch (e) {
            next(e);
        };
    }

};

export default LivroController