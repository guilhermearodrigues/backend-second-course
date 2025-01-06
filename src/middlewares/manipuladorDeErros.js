/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import Erro404 from "../erros/Erro404.js";

function manipuladorDeErros (e, req, res, next) {
        if (e instanceof mongoose.Error.CastError) {
            new RequisicaoIncorreta().enviarResposta(res);
        } else if (e instanceof mongoose.Error.ValidationError) {
            new ErroValidacao(e).enviarResposta(res);
        } else if (e instanceof Erro404) {
            e.enviarResposta(res);
        } else {
            new ErroBase().enviarResposta(res);
        }
}

export default manipuladorDeErros;