import express from 'express';
import connectDB from './dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';

const app = express();
routes(app);

app.use(manipuladorDeErros);

const connect = await connectDB();

connect.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

connect.once("open", () => {
    console.log("Conexão realizada.");
});

export default app;