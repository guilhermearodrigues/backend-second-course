import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import Erro404 from "../erros/Erro404.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
    } catch (e) {
      next(e);
    }
  }

  static async listarLivroPorId(req, res, next) {
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

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Criado com sucesso", livro: livroCriado });
    } catch (e) {
      next(e);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const dados = req.body;
      const livroEncontrado = await livro.findByIdAndUpdate(id, dados);
      if (livroEncontrado !== null) {
        res.status(200).json({ message: "Livro atualizado" });
      } else {
        next(new Erro404(`O ID ${id} não foi encontrado.`));
      }
    } catch (e) {
      next(e);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroDeletado = await livro.findByIdAndDelete(id);
      if (livroDeletado !== null) {
        res.status(200).json({ message: "Livro deletado" });
      } else {
        next(new Erro404(`O ID ${id} não foi encontrado.`));
      }
    } catch (e) {
      next(e);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosFiltrados = await livro.find(busca).populate("autor");
        if (livrosFiltrados !== null) {
          res.status(200).json(livrosFiltrados);
        } else {
          res.status(200).send([]);
        }
      }
    } catch (e) {
      next(e);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;
  if (nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });
    if (autorEncontrado !== null) {
      busca.autor = autorEncontrado._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
