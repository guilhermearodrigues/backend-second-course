/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

function manipuladorDeErros (e, req, res, next) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).send({message: `Erro na requisição`});
        } else if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send({message: `Erro de validação de dados`});
        } else {
            res.status(500).send({message: `Erro interno de servidor`});
        }
}

export default manipuladorDeErros;