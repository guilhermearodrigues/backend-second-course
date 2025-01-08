import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar); // retorna todos os livros
routes.get("/livros/busca", LivroController.listarLivrosPorFiltro); // lista livros por editora
routes.get("/livros/:id", LivroController.listarLivroPorId); // retorna o livro pelo id informado
routes.post("/livros", LivroController.cadastrarLivro); // cadastra novos livros
routes.put("/livros/:id", LivroController.atualizarLivro); // altera dados de um livro existente
routes.delete("/livros/:id", LivroController.deletarLivro); // deleta um livro

export default routes;
