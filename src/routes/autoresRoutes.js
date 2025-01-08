import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores, paginar); // retorna todos os autores
routes.get("/autores/:id", AutorController.listarAutorPorId); // retorna o autor pelo id informado
routes.post("/autores", AutorController.cadastrarAutor); // cadastra novos autores
routes.put("/autores/:id", AutorController.atualizarAutor); // altera dados de um autor existente
routes.delete("/autores/:id", AutorController.deletarAutor); // deleta um autor

export default routes;
